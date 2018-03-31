'use strict';

 /**
 * callback after query
 * @callback queryCallback
 * @param {object} error the error object
 * @param {object} result the result of the query
 */

let pool = require('../../config/db').pool;

/**
 * add a new land and returns a new id
 * @param {string} name name of land
 * @param {queryCallback} done callback
 */
function createLand(land, done) {
    let cmd = 'INSERT INTO land(name) VALUES (?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [land.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    }); 
}

/**
 * get specific amount of lands
 * @param {number} count query limit
 * @param {queryCallback} done callback
 */
function getLands(count, done) {
    if (!count) {
        count = 1000;
    }
    let cmd = 'SELECT * FROM land LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get land by id
 * @param {number} id land id
 * @param {queryCallback} done callback
 */
function getLandById(id, done) {
    let cmd = 'SELECT * FROM land WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * update land by id
 * @param {number} id land id
 * @param {string} name the new land name
 * @param {queryCallback} done callback
 */
function updateLandById(id, land, done) {
    let cmd = 'UPDATE land SET name=? WHERE id=? LIMIT 1;';
    let params = [land.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete land by id
 * @param {number} id land id
 * @param {queryCallback} done callback
 */
function deleteLandById(id, done) {
    let cmd = 'DELETE FROM land WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}


module.exports = {createLand, getLands, getLandById, updateLandById, deleteLandById};