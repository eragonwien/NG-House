var pool = require('../../config/db').pool;

exports.createOfferStatus = function (status, done) {
    var cmd = 'INSERT INTO offer_status(name) VALUES (?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);'
    var params = [status.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};

exports.getAllOfferStatuses = function (done) {
    var cmd = 'SELECT * FROM offer_status;';
    var params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};

exports.getOfferStatusById = function (id, done) {
    var cmd = 'SELECT * FROM offer_status WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result[0]);
    });
};

exports.updateOfferStatusById = function (id, status, done) {
    var cmd = 'UPDATE offer_status SET name=? WHERE id=?;';
    var params = [status.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};

exports.deleteOfferStatusById = function (id, done) {
    var cmd = 'DELETE FROM offer_status WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};