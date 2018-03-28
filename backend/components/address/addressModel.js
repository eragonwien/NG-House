var pool = require('../../config/db').pool;

exports.createNewAddress = function (address, done) {
    var cmd = 'INSERT INTO address(address, postal_code, city, land) VALUES (?, ?, ?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';
    var params = [address.address, address.postal_code, address.city, address.land];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
};

exports.getAllAddresses = function (done) {
    var cmd = 'SELECT * FROM address;'
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    })
};

exports.getDistinctCities = function (done) {
    var cmd = 'SELECT DISTINCT city, land FROM address;'
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    })
};

exports.getAddressById = function (id, done) {
    var cmd = 'SELECT * FROM address WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    })
};

exports.getAddressIdByAddress = function (address, done) {
    var cmd = 'SELECT id FROM address WHERE address=? AND postal_code=? AND city=? AND land=? LIMIT 1;';
    var params = [address.address, address.postal_code, address.city, address.land];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    })
};

exports.updateAddressById = function (id, address, done) {
    var cmd = 'UPDATE address ';
    cmd += 'SET address=?, postal_code=?, city=?, land=? WHERE id=?;';
    var params = [address.address, address.postal_code, address.city, address.land, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
};

exports.deleteAddressById = function (id, done) {
    var cmd = 'DELETE FROM address WHERE id=?;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
};