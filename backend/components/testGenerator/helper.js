/**
 * returns a list of strings
 * @param {string} str string contains items separated by comma
 * @returns {string[]} list of strings
 */
function getListFromString(str) {
    var list = [];
    var lastIndex = -1;
    for (let i = 0; i < str.length; i++) {
        if (lastIndex == -1) {
            lastIndex = i;
        }
        if (str.charAt(i) == ',') {
            var item = str.substring(lastIndex, i);
            lastIndex = -1;
            if (item != '') {
                list.push(item);
            }
            continue;
        }
        if (i == (str.length - 1) && lastIndex != -1) {
            var item = str.substring(lastIndex, str.length);
            if (item != '') {
                list.push(item);  
            }          
        }
    }
    return list;
}
exports.getListFromString = getListFromString;

/**
 * returns a integer between the min and max values
 * @param {number} min min value
 * @param {number} max max value
 * @returns {number} a random integer
 */
function getRandomInt(min, max) {
    if (!max) {
        max = min;
        min = 0;
    }
    return Math.floor((Math.random() * (max - min)) + min);
}
exports.getRandomInt = getRandomInt;

/**
 * returns a list contains only values of a specific key
 * @param {object[]} list array of objects
 * @param {string} key key of object
 * @returns {string[]} array of values of key
 */
function filterValuesOfList(list, key) {
    var result = [];
    list.forEach(function (value) {
        if (value[key]) {
            result.push(value[key]);
        }
    });
    return result;
}
exports.filterValuesOfList = filterValuesOfList;

function doesContainerHasArray(container, array) {
    if (container.length < array.length) {
        return false;
    }
    for (let x = 0; x < array.length; x++) {
        var found = false;
        for (let y = 0; y < container.length; y++) {
            if (container[y] == array[x]) {
                found = true;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}
exports.doesContainerHasArray = doesContainerHasArray;

/**
 * get all users
 */
function getAllUsers() {
    
    return new Promise(resolveUsers);

    function resolveUsers(resolve, reject) {
        var userModel = require('../user/userModel');
        userModel.getAllUsers(function (error, users) {
            if (error) {
                return reject(error);
            }
            var results = filterValuesOfList(users, 'id');
            return resolve(results);
        });
    }
}
exports.getAllUsers = getAllUsers;

/**
 * get all addresses
 */
function getAllAddresses() {
    return new Promise(resolveAddresses);

    function resolveAddresses(resolve, reject) {
        var addressModel = require('../address/addressModel');
        addressModel.getAllAddresses(function (error, addresses) {
            if (error) {
                return reject(error);
            }
            var results = filterValuesOfList(addresses, 'id');
            return resolve(results);
        });
    }
}
exports.getAllAddresses = getAllAddresses;

/**
 * get all house types
 */
function getAllHouseTypes() {
    return new Promise(resolveHouseTypes);

    function resolveHouseTypes(resolve, reject) {
        var houseTypeModel = require('../houseType/houseTypeModel');      
        houseTypeModel.getAllHouseType(function (error, houseTypes) {
            if (error) {
                return reject(error);
            }
            var results = filterValuesOfList(houseTypes, 'id');
            return resolve(results);
        });
    }
}
exports.getAllHouseTypes = getAllHouseTypes;

/**
 * get all currencies
 */
function getAllCurrencies() {
    return new Promise(resolveCurrencies);

    function resolveCurrencies(resolve, reject) {
        var currencyModel = require('../currency/currencyModel');
        currencyModel.getAllCurrencies(function (error, currencies) {
            if (error) {
                return reject(error);
            }
            var results = filterValuesOfList(currencies, 'id');
            return resolve(results);
        });
    }
}
exports.getAllCurrencies = getAllCurrencies;

/**
 * get all currencies
 */
function getAllHouses() {
    return new Promise(resolveHouses);

    function resolveHouses(resolve, reject) {
        var houseModel = require('../house/houseModel');
        houseModel.getAllHouses(function (error, houses) {
            if (error) {
                return reject(error);
            }
            var results = filterValuesOfList(houses, 'id');
            return resolve(results);
        });
    }
}
exports.getAllHouses = getAllHouses;