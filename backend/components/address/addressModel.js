let pool = require('../../config/db').pool;

exports.createNewAddress = function (address, done) {
    let cmd = 'INSERT INTO address(address, postal_code, city, land) VALUES (?, ?, ?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';
    let params = [address.address, address.postal_code, address.city, address.land];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
};

exports.getAllAddresses = function (done) {
    let cmd = 'SELECT * FROM address;'
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    })
};

exports.getDistinctCities = function (done) {
    let cmd = 'SELECT DISTINCT city, land FROM address;'
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    })
};

exports.getAddressById = function (id, done) {
    let cmd = 'SELECT * FROM address WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    })
};

exports.getAddressIdByAddress = function (address, done) {
    let cmd = 'SELECT id FROM address WHERE address=? AND postal_code=? AND city=? AND land=? LIMIT 1;';
    let params = [address.address, address.postal_code, address.city, address.land];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    })
};

exports.updateAddressById = function (id, address, done) {
    let cmd = 'UPDATE address ';
    cmd += 'SET address=?, postal_code=?, city=?, land=? WHERE id=?;';
    let params = [address.address, address.postal_code, address.city, address.land, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
};

exports.deleteAddressById = function (id, done) {
    let cmd = 'DELETE FROM address WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
};