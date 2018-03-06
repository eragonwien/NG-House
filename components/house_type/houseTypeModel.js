var pool = require('../../config/db').pool;

exports.createHouseType = function (house_type, done) {
    var cmd = 'INSERT INTO house_type(name) VALUES(?) ';
    cmd += 'ON DUPLICATE UPDATE id=LAST_INSERT_ID(id);'
    var params = [house_type.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getAllHouseType = function (done) {
    var cmd = 'SELECT * FROM house_type;';
    var params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getHouseTypeById = function (id, done) {
    var cmd = 'SELECT * FROM house_type WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
};

exports.updateHouseTypeById = function (id, house_type, done) {
    var cmd = 'UPDATE house_type SET name=? WHERE id=?';
    var params = [house_type.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.deleteHouseTypeById = function (id, done) {
    var cmd = 'DELETE FROM house_type WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};