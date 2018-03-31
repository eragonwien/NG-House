'use strict';

 /**
 * callback after query
 * @callback queryCallback
 * @param {object} error the error object
 * @param {object} result the result of the query
 */

let pool = require('../../config/db').pool;

/**
 * add a new city and returns a new id
 * @param {string} name name of city
 * @param {queryCallback} done callback
 */
function createCity(city, done) {
    let cmd = 'INSERT INTO city(name, land_id) VALUES (?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [city.name, city.land_id];
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
function getCities(count, done) {
    if (!count) {
        count = 1000;
    }
    let cmd = 'SELECT * FROM city LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get city by id
 * @param {number} id city id
 * @param {queryCallback} done callback
 */
function getCityById(id, done) {
    let cmd = 'SELECT * FROM city WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * update city by id
 * @param {number} id city id
 * @param {string} name the new city name
 * @param {queryCallback} done callback
 */
function updateCityById(id, city, done) {
    let cmd = 'UPDATE city SET name=?, land_id=? WHERE id=? LIMIT 1;';
    let params = [city.name, city.land_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete city by id
 * @param {number} id city id
 * @param {queryCallback} done callback
 */
function deleteCityById(id, done) {
    let cmd = 'DELETE FROM city WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}


module.exports = {createCity, getCities, getCityById, updateCityById, deleteCityById};