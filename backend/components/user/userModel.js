var pool = require('../../config/db').pool;
var addressModel = require('../address/addressModel');
exports.getAllUsers = function (done) {
    var cmd = 'SELECT * FROM get_users ORDER BY id;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

exports.getUserById = function (id, done) {
    var cmd = 'SELECT * FROM get_users WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}

exports.getUserByUsername = function (username, done) {
    var cmd = 'SELECT * FROM get_users WHERE username=? LIMIT 1;';
    var params = [username];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}

exports.getUserByEmail = function (email, done) {
    var cmd = 'SELECT * FROM get_users WHERE email=? LIMIT 1;';
    var params = [email];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}

function insertUser(user, done) {
    var cmd = 'INSERT INTO user(first_name, last_name, username, password, email, role_id, address_id) ';
    cmd += 'VALUES (?, ?, ?, ?, ?, ?, ?);';
    var params = [user.first_name, user.last_name, user.username, user.password, user.email, user.role_id, user.address_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
}

exports.createUser = function (user, done) {
    // if address_id is available, skip searching address
    if (user.address_id) {
        insertUser(user, done);
        return;
    }
    var address = {
        address: user.address,
        postal_code: user.postal_code,
        city: user.city,
        land: user.land
    }
    addressModel.createNewAddress(address, function (error, result) {
        if (error) {
            return done(error);
        }
        user.address_id = result.insertId;
        insertUser(user, done);
    })
}

exports.updateUserById = function (id, user, done) {
    var cmd = 'UPDATE user ';
    cmd += 'SET first_name=?, last_name=?, address_id=? ';
    cmd += 'WHERE id=?;';
    var params = [user.first_name, user.last_name, user.address_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
}

exports.deleteUserById = function (id, done) {
    var cmd = 'DELETE FROM user WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
}


