var pool = require('../../config/db').pool;

exports.createHouseStatus = function (house_status, done) {
    var cmd = 'INSERT INTO house_status(name) VALUES(?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);'
    var params = [house_status.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getAllHouseStatuses = function (done) {
    var cmd = 'SELECT * FROM house_status;';
    var params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getHouseStatusById = function (id, done) {
    var cmd = 'SELECT * FROM house_status WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
};

exports.updateHouseStatusById = function (id, house_status, done) {
    var cmd = 'UPDATE house_status SET name=? WHERE id=?';
    var params = [house_status.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.deleteHouseStatusById = function (id, done) {
    var cmd = 'DELETE FROM house_status WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};