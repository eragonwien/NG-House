let debug = require('debug')('test_generator_model');
let helper = require('./helper');
let random = require('random-name');

let addressModel = require('../address/address.model');
let postalCodeModel = require('../postalCode/postal.code.model');
let userModel = require('../user/user.model');
let houseModel = require('../house/house.model');
let bookmarkModel = require('../bookmark/bookmark.model');
let tagModel = require('../houseTag/house.tag.model');

function startTest(test, done) {
    if (!test) {
        return done(new Error('input is empty'));
    }
    switch (test.type) {
        case 'address':
            prepareAddresses(test, done);
            break;
        case 'bookmark':
            prepareBookmarks(test, done);
            break;
        case 'house':
            prepareHouses(test, done);
            break;
        case 'tag':
            prepareTags(test, done);
            break;
        case 'user':
            prepareUsers(test, done);
            break;
        default:
            done(new Error('test type is not supported.'));
            break;
    }
}
exports.startTest = startTest;

function prepareAddresses(test, done) {    
    postalCodeModel.getPostalCodes(null, function (error, results) {
        let postalCodeIds = helper.filterValuesOfList(results, 'id');
        spawnAddresses(test.count, postalCodeIds, 0, null, done); 
    });
}

/**
 * generates addresses
 * @param {number} count number of tries
 * @param {number[]} postalCodeIds list of postal code ids
 * @param {number} successCount success times
 * @param {object[]} errors list of errors
 * @param {callback} done callback
 */
function spawnAddresses(count, postalCodeIds, successCount, errors, done) {
    
    if (!successCount) {
        successCount = 0;
    }
    if (!errors) {
        errors = [];
    }
    if (count <= 0) {
        let result = {
            success: (successCount > 0),
            count: successCount,
            errors: errors
        };
        return done(null, result);
    }
    // generate an address object
    let address = {
        street_name: random.place(),
        house_number: helper.random(1, 500),
        postal_code_id: postalCodeIds[helper.random(postalCodeIds.length)]
    };
    // insert query
    addressModel.createNewAddress(address, function (error, result) {
        if (error) {
            errors.push(error);
        }
        successCount = (error) ? successCount : successCount + 1;
        count--;
        spawnAddresses(count, postalCodeIds, successCount, errors, done);
    });
}

function prepareBookmarks(test, done) {
    Promise.all([helper.getUsers(), helper.getHouses()]).then(promiseSuccess).catch(promiseError)

    function promiseSuccess(values) {
        let userIds = values[0];
        let houseIds = values[1];
        spawnBookmarks(test.count, userIds, houseIds, 0, null, done);
    }

    function promiseError(error) {
        done(error);
    }
    
}

/**
 * generate bookmarks
 * @param {number} count number of users to be generated
 * @param {string[]} userIds list of user ids
 * @param {string[]} houseIds list of house ids
 * @param {number} successCount number of successful query
 * @param {object[]} errors list of errors
 */
function spawnBookmarks(count, userIds, houseIds, successCount, errors, done) {
    if (!successCount) {
        successCount = 0;
    }
    if (!errors) {
        errors = [];
    }
    if (count <= 0) {
        let result = {
            success: (successCount > 0),
            count: successCount
        };
        return done(null, result);
    }

    let bookmark = {
        user_id: userIds[helper.random(userIds.length)],
        house_id: houseIds[helper.random(houseIds.length)]
    };

    bookmarkModel.createBookmark(bookmark, function (error, result) {
        if (error) {
            errors.push(error);
        }
        successCount = (error) ? successCount : successCount + 1;
        count--;
        spawnBookmarks(count, userIds, houseIds, successCount, errors, done);
    });
}

function prepareHouses(test, done) {
    Promise.all([helper.getUsers(), helper.getHouseTypes(), helper.getAddresses(), helper.getCurrencies()]).then(promiseSuccess).catch(promiseError)

    function promiseSuccess(values) {
        let userIds = values[0];
        let houseTypeIds = values[1];
        let addressIds = values[2];
        let currencyIds = values[3];
        spawnHouses(test.count, userIds, houseTypeIds, addressIds, currencyIds, 0, null, done);
    }

    function promiseError(error) {
        done(error);
    }
}

/**
 * generates houses recursively
 * @param {number} count number of houses to be generated
 * @param {number[]} userIds list of all user ids
 * @param {number[]} houseTypeIds list of all type ids
 * @param {number[]} addressIds list of all address ids
 * @param {number[]} currencyIds list of all currency ids 
 * @param {number} successCount number of successful inserts
 * @param {function} done callback
 * house is generated by querying user , type, address and currency
 * a type is randomly chosen. base on type a specific ranges are generated
 * size: min 20 - max. 1000, 1-2 bathrooms, 1-2 bedrooms
 * price = (2000 - 5000) * size
 */
function spawnHouses(count, userIds, houseTypeIds, addressIds, currencyIds, successCount, errors, done) {
    if (!successCount) {
        successCount = 0;
    }
    if (!errors) {
        errors = [];
    }
    if (count <= 0) {
        let result = {
            success: (successCount > 0),
            count: successCount,
            errors: errors
        };
        return done(null, result);
    }
    // create house
    let bathrooms = helper.random(1, 5);
    let bedrooms = helper.random(1, 5);
    let rooms = bathrooms + bedrooms + helper.random(1, 3);
    let size = helper.random(rooms * 10, rooms * 100);
    let price = helper.random(200, 1000) * size;
    let house = {
        price: price,
        rooms : rooms,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        size: size,
        user_id: userIds[helper.random(userIds.length)],
        address_id: addressIds[helper.random(addressIds.length)],
        house_type_id: houseTypeIds[helper.random(houseTypeIds.length)],
        house_status_id: 1, 
        currency_id: currencyIds[helper.random(currencyIds.length)],
    };
    houseModel.createHouse(house, function (error, result) {
        if (error) {
            errors.push(error);
        }
        successCount = (error) ? successCount : successCount + 1;
        count--;
        spawnHouses(count, userIds, houseTypeIds, addressIds, currencyIds, successCount, errors, done);
    });
}

/**
 * prepare for generating tags
 * @param {object} test test object
 * @param {callback} done callback
 */
function prepareTags(test, done) {
    Promise.all([helper.getHouses(), helper.getTags()]).then(promiseSuccess).catch(promiseError)

    function promiseSuccess(values) {
        let houseIds = values[0];
        let tagIds = values[1];
        spawnTags(test.count, houseIds, tagIds, 0, null, done);
    }

    function promiseError(error) {
        done(error);
    }
}

/**
 * generates tags
 * @param {number} count number of tries
 * @param {number[]} houseList list of house id
 * @param {number[]} tagList list of tag id
 * @param {number} successCount number of success
 * @param {object[]} errors list of errors
 * @param {callback} done callback
 */
function spawnTags(count, houseList, tagList, successCount, errors, done) {
    if (!successCount) {
        successCount = 0;
    }
    if (!errors) {
        errors = [];
    }
    if (count <= 0) {
        let result = {
            success: (successCount > 0),
            count: successCount
        };
        return done(null, result);
    }
    let houseTag = {
        tag_id: tagList[helper.random(tagList.length)],
        house_id: houseList[helper.random(houseList.length)]
    };
    tagModel.createHouseTag(houseTag, function (error, result) {
        if (error) {
            errors.push(error);
        }
        successCount = (error) ? successCount : successCount + 1;
        count--;
        spawnTags(count, houseList, tagList, successCount, errors, done);
    });
}

/**
 * prepares for generating users
 * @param {object} test test object
 * @param {callback} done callback
 */
function prepareUsers(test, done) {
    addressModel.getAddresses(null, function (error, results) {
        if (error) {
            return done(error);
        } 
        // extract only the address id from the results
        let address_ids = helper.filterValuesOfList(results, 'id');
        spawnUsers(test.count, address_ids, 0, null, done); 
    });
}

/**
 * generate users
 * @param {number} count number of users to be generated
 * @param {number[]} addressList list of addresses
 * @param {number[]} successCount number of successful query
 * @param {object[]} errors list of errors
 * @param {callback} done callback
 */
function spawnUsers(count, addressList, successCount, errors, done) {
    if (!successCount) {
        successCount = 0;
    }
    if (!errors) {
        errors = [];
    }
    if (count <= 0) {
        let result = {
            success: (successCount > 0),
            count: successCount
        };
        return done(null, result);
    }
    // generates an user object
    let first_name = random.first();
    let last_name = random.last();
    let randomValue = helper.random(1000);
    let username = first_name + last_name + randomValue;
    let user = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: 'test',
        email: username + '@' + last_name + '.com',
        role_id: 1,
        address_id: addressList[helper.random(addressList.length)]
    };
    // insert query
    userModel.createUser(user, function (error, result) {
        if (error) {
            errors.push(error);
        }
        successCount = (error) ? successCount : successCount + 1;
        count--;
        spawnUsers(count, addressList, successCount, errors, done);
    });
}