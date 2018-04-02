let pool = require('../../config/db').pool;
let addressModel = require('../address/address.model');
let bcrypt = require('bcrypt');
let debug = require('debug')('user_model');

/**
 * hashes password, checks paramaters of user then forwards for insertion
 * @param {object} user user object
 * @param {callback} done callback
 */
function createUser (user, done) {
    // hashes user password
    let salt = (process.env.SALT) ? process.env.SALT : 10; // set salt default is 10
    bcrypt.hash(user.password, salt, function (error, hashedPassword) {
        user.password = hashedPassword;
        // if address_id is available, skip searching address
        if (user.address_id) {
            insertUser(user, done);
            return;
        }
        let address = {
            street_name: user.street_name,
            house_number: user.house_number,
            postal_code_id: user.postal_code_id
        };
        addressModel.createNewAddress(address, function (error, result) {
            if (error) {
                return done(error);
            }
            user.address_id = result.insertId;
            insertUser(user, done);
        });
    });
}

/**
 * performs inserting user in database
 * @param {object} user user object
 * @param {callback} done callback
 */
function insertUser(user, done) {
    let cmd = 'INSERT INTO user(first_name, last_name, username, password, email, role_id, address_id) ';
    cmd += 'VALUES (?, ?, ?, ?, ?, ?, ?);';
    let params = [user.first_name, user.last_name, user.username, user.password, user.email, user.role_id, user.address_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get users
 * @param {number} count number of users
 * @param {callback} done callback
 */
function getUsers (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM get_users ORDER BY id LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

/**
 * gets user by id
 * @param {number} id user id
 * @param {callback} done callback
 */
function getUserById (id, done) {
    let cmd = 'SELECT * FROM get_users WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    });
}

/**
 * gets user by username
 * @param {string} username name of user
 * @param {callback} done callback
 */
function getUserByUsername (username, done) {
    let cmd = 'SELECT * FROM get_users WHERE username=? LIMIT 1;';
    let params = [username];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    });
}

/**
 * gets user by email address
 * @param {string} email email address of user
 * @param {callback} done callback
 */
function getUserByEmail (email, done) {
    let cmd = 'SELECT * FROM get_users WHERE email=? LIMIT 1;';
    let params = [email];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    });
}

/**
 * updates user by id
 * @param {number} id user id
 * @param {object} user user object
 * @param {callback} done callback
 */
function updateUserById (id, user, done) {
    
    // hashes user password
    let salt = (process.env.SALT) ? process.env.SALT : 10; // set salt default is 10
    bcrypt.hash(user.password, salt, function (error, hashedPassword) {
        if (error) {
            return done(error);
        }
        user.password = hashedPassword; 
        // skip fetching address if address id exists
        if (user.address_id) {
            executeUpdateUser(id, user, done);
            return;
        }
        let address = {
            street_name: user.street_name,
            house_number: user.house_number,
            postal_code_id: user.postal_code_id
        };
        addressModel.createNewAddress(address, function (error, result) {
            if (error) {
                return done(error);
            }
            user.address_id = result.insertId;
            
        });
    });
}

/**
 * executes updating user
 * when password is hashed and address id is present
 * @param {number} id user id
 * @param {object} user user
 * @param {queryCallback} done callback
 */
function executeUpdateUser(id, user, done) {
    let cmd = 'UPDATE user SET first_name=?, last_name=?, address_id=?, role_id=?, password=? WHERE id=?;';
    let params = [user.first_name, user.last_name, user.address_id, user.role_id, user.password, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete user by id
 * @param {number} id user id
 * @param {callback} done callback
 */
function deleteUserById (id, done) {
    let cmd = 'DELETE FROM user WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * compares passwords and returns true or false
 * @param {string} input password inputed by user
 * @param {string} hash hashed password saved in database
 * @param {callback} next callback function
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

module.exports = {createUser, getUsers, getUserById, getUserByEmail, getUserByUsername, updateUserById, deleteUserById, comparePassword};