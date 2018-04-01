let pool = require('../../config/db').pool;

/**
 * create house type
 * @param {object} house_type house type
 * @param {callback} done callback
 */
function createHouseType (house_type, done) {
    let cmd = 'INSERT INTO house_type(name) VALUES(?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);'
    let params = [house_type.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get house types
 * @param {number} count query limit
 * @param {callback} done callback
 */
function getHouseTypes (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM house_type LIMIT ' + count + ';';
    let params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get house type by id
 * @param {number} id house type id
 * @param {callback} done callback
 */
function getHouseTypeById (id, done) {
    let cmd = 'SELECT * FROM house_type WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * update house type by id
 * @param {number} id house type id
 * @param {object} house_type updated house type
 * @param {callback} done callback
 */
function updateHouseTypeById (id, house_type, done) {
    let cmd = 'UPDATE house_type SET name=? WHERE id=?';
    let params = [house_type.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete house type by id
 * @param {number} id house type id
 * @param {callback} done callback
 */
function deleteHouseTypeById (id, done) {
    let cmd = 'DELETE FROM house_type WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createHouseType, getHouseTypes, getHouseTypeById, updateHouseTypeById, deleteHouseTypeById};