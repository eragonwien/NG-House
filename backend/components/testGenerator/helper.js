
/**
 * returns a list contains only values of a specific key
 * @param {object[]} list array of objects
 * @param {string} key key of object
 * @returns {string[]} array of values of key
 */
function filterValuesOfList(list, key) {
    let result = [];
    list.forEach(function (value) {
        if (value[key]) {
            result.push(value[key]);
        }
    });
    return result;
}

/**
 * get all users
 */
function getUsers() {
    return new Promise(resolveUsers);

    function resolveUsers(resolve, reject) {
        let userModel = require('../user/user.model');
        userModel.getUsers(null, function (error, users) {
            if (error) {
                return reject(error);
            }
            let results = filterValuesOfList(users, 'id');
            return resolve(results);
        });
    }
}

/**
 * get all addresses
 */
function getAddresses() {
    return new Promise(resolveAddresses);

    function resolveAddresses(resolve, reject) {
        let addressModel = require('../address/address.model');
        addressModel.getAddresses(null, function (error, addresses) {
            if (error) {
                return reject(error);
            }
            let results = filterValuesOfList(addresses, 'id');
            return resolve(results);
        });
    }
}

/**
 * get all house types
 */
function getHouseTypes() {
    return new Promise(resolveHouseTypes);

    function resolveHouseTypes(resolve, reject) {
        let houseTypeModel = require('../houseType/house.type.model');      
        houseTypeModel.getHouseTypes(null, function (error, houseTypes) {
            if (error) {
                return reject(error);
            }
            let results = filterValuesOfList(houseTypes, 'id');
            return resolve(results);
        });
    }
}

/**
 * get all currencies
 */
function getCurrencies() {
    return new Promise(resolveCurrencies);

    function resolveCurrencies(resolve, reject) {
        let currencyModel = require('../currency/currency.model');
        currencyModel.getCurrencies(null, function (error, currencies) {
            if (error) {
                return reject(error);
            }
            let results = filterValuesOfList(currencies, 'id');
            return resolve(results);
        });
    }
}

/**
 * get all houses
 */
function getHouses() {
    return new Promise(resolveHouses);

    function resolveHouses(resolve, reject) {
        let houseModel = require('../house/house.model');
        houseModel.getHouses(null, null, function (error, houses) {
            if (error) {
                return reject(error);
            }
            let results = filterValuesOfList(houses, 'id');
            return resolve(results);
        });
    }
}

/**
 * get all tags
 */
function getTags() {
    return new Promise(resolveTags);

    function resolveTags(resolve, reject) {
        let tagModel = require('../tag/tag.model');
        tagModel.getTags(null, function (error, tags) {
            if (error) {
                return reject(error);
            }
            let results = filterValuesOfList(tags, 'id');
            return resolve(results);
        });
    }
}

/**
 * returns a integer between the min and max values
 * @param {number} min min value
 * @param {number} max max value
 * @returns {number} a random integer
 */
function random(min, max) {
    if (!max) {
        max = min;
        min = 0;
    }
    return Math.floor((Math.random() * (max - min)) + min);
}

module.exports = {filterValuesOfList, getAddresses, getCurrencies, getHouses, getHouseTypes, getTags, getUsers, random};