var pool = require('../../config/db').pool;

exports.getAllUsers = function (done) {
    var cmd = 'SELECT * FROM user;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

exports.getUserById = function (id, done) {
    var cmd = 'SELECT * FROM user WHERE id=?';
    var params = [id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}

exports.getUserByUsername = function (username, done) {
    var cmd = 'SELECT * FROM user WHERE username=? LIMIT 1';
    var params = [username];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}

exports.getUserByEmail = function (email, done) {
    var cmd = 'SELECT * FROM user WHERE email=? LIMIT 1';
    var params = [email];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}

exports.createUser = function (user, done) {
    var cmd = 'INSERT INTO user(role_id, first_name, last_name, username, password, email, address_id) ';
    cmd += 'VALUES (?, ?, ?, ?, ?, ?, ?);';
    var params = [user.role_id, user.first_name, user.last_name, user.username, user.password, user.email, user.address_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
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