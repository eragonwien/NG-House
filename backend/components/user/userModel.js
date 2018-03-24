var pool = require('../../config/db').pool;
var addressModel = require('../address/addressModel');
var bcrypt = require('bcrypt');
var debug = require('debug')('user_model');

/**
 * gets all users
 * @param {function({error}, {results: object[]})} done callback
 */
function getAllUsers (done) {
    var cmd = 'SELECT * FROM get_users ORDER BY id;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}
exports.getAllUsers = getAllUsers

/**
 * gets user by id
 * @param {number} id user id
 * @param {function({error}, {result})} done callback
 */
function getUserById (id, done) {
    var cmd = 'SELECT * FROM get_users WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}
exports.getUserById = getUserById;

/**
 * gets user by username
 * @param {string} username name of user
 * @param {function({error}, {result})} done callback
 */
function getUserByUsername (username, done) {
    var cmd = 'SELECT * FROM get_users WHERE username=? LIMIT 1;';
    var params = [username];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}
exports.getUserByUsername = getUserByUsername;

/**
 * gets user by email address
 * @param {string} email email address of user
 * @param {function({error}, {result})} done callback
 */
function getUserByEmail (email, done) {
    var cmd = 'SELECT * FROM get_users WHERE email=? LIMIT 1;';
    var params = [email];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    })
}
exports.getUserByEmail = getUserByEmail;

/**
 * performs inserting user in database
 * @param {object} user user object
 * @param {function({error}, {result})} done callback
 */
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

/**
 * hashes password, checks paramaters of user then forwards for insertion
 * @param {object} user user object
 * @param {function({error}, {result})} done callback
 */
function createUser (user, done) {
    // hashes user password
    var salt = (process.env.SALT) ? process.env.SALT : 10; // set salt default is 10
    bcrypt.hash(user.password, salt, function (error, hashedPassword) {
        user.password = hashedPassword;
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
        });
    });
}
exports.createUser = createUser;

/**
 * updates user by id
 * @param {number} id user id
 * @param {object} user user object
 * @param {function({error}, {result})} done callback
 */
function updateUserById (id, user, done) {
    var cmd = 'UPDATE user SET first_name=?, last_name=?, address_id=? WHERE id=?;';
    var params = [user.first_name, user.last_name, user.address_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
}
exports.updateUserById = updateUserById;

/**
 * delete user by id
 * @param {number} id user id
 * @param {function({error}, {result})} done callback
 */
function deleteUserById (id, done) {
    var cmd = 'DELETE FROM user WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    })
}
exports.deleteUserById = deleteUserById;

/**
 * compares passwords and returns true or false
 * @param {string} input password inputed by user
 * @param {string} hash hashed password saved in database
 * @param {function({isAMatch : boolean})} next callback function
 */
function comparePassword(input, hash, next) {
    bcrypt.compare(input, hash, function (error, isAMatch) {
        if (error) {
            debug(error);
            return next(false);
        }
        next(isAMatch);
    });
}
exports.comparePassword = comparePassword;
