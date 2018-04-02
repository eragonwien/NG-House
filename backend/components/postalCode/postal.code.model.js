'use strict';

 /**
 * callback after query
 * @callback queryCallback
 * @param {object} error the error object
 * @param {object} result the result of the query
 */

let pool = require('../../config/db').pool;
let debug = require('debug')('postal_code_model');

/**
 * add a new postal_code and returns a new id
 * @param {string} name name of postal_code
 * @param {queryCallback} done callback
 */
function createPostalCode(postal_code, done) {
    let cmd = 'INSERT INTO postal_code(code, name, city_id, land_id) VALUES (?, ?, ?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [postal_code.code , postal_code.name, postal_code.city_id, postal_code.land_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    }); 
}

/**
 * get specific amount of citys
 * @param {number} count query limit
 * @param {queryCallback} done callback
 */
function getPostalCodes(count, done) {
    if (!count) {
        count = 1000;
    }
    let cmd = 'SELECT * FROM get_postal_codes LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get postal_code by id
 * @param {number} id postal_code id
 * @param {queryCallback} done callback
 */
function getPostalCodeById(id, done) {
    let cmd = 'SELECT * FROM get_postal_codes WHERE id=? LIMIT 1;';
    let params = [id];
    let query = pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * get postal code by code, city and land names
 * @param {number} code postal code
 * @param {string} city city name
 * @param {string} land land name
 * @param {queryCallback} done callback
 */
function getPostalCodeByAddress(address, done) {
    let cmd = 'SELECT * FROM get_postal_codes WHERE postal_code_code=? AND city_name=? AND land_name=? LIMIT 1;';
    let params = [address.postal_code_code, address.city_name, address.land_name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * update postal_code by id
 * @param {number} id postal_code id
 * @param {string} name the new postal_code name
 * @param {queryCallback} done callback
 */
function updatePostalCodeById(id, postal_code, done) {
    let cmd = 'UPDATE postal_code SET code=?, name=?, city_id=?, land_id=? WHERE id=? LIMIT 1;';
    let params = [postal_code.code , postal_code.name, postal_code.city_id, postal_code.land_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete postal_code by id
 * @param {number} id postal_code id
 * @param {queryCallback} done callback
 */
function deletePostalCodeById(id, done) {
    let cmd = 'DELETE FROM postal_code WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}


module.exports = {createPostalCode, getPostalCodes, getPostalCodeById, getPostalCodeByAddress, updatePostalCodeById, deletePostalCodeById};