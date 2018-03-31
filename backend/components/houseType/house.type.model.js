let pool = require('../../config/db').pool;

exports.createHouseType = function (house_type, done) {
    let cmd = 'INSERT INTO house_type(name) VALUES(?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);'
    let params = [house_type.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getAllHouseType = function (done) {
    let cmd = 'SELECT * FROM house_type;';
    let params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getHouseTypeById = function (id, done) {
    let cmd = 'SELECT * FROM house_type WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
};

exports.updateHouseTypeById = function (id, house_type, done) {
    let cmd = 'UPDATE house_type SET name=? WHERE id=?';
    let params = [house_type.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.deleteHouseTypeById = function (id, done) {
    let cmd = 'DELETE FROM house_type WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};