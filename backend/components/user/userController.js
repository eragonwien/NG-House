var model = require('./userModel');
var session = require('../../config/session');
var debug = require('debug')('user_controller');
/**
 * get all users
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.getAllUsers = function (req, res, next) {
    model.getAllUsers(function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results);
    })
}

/**
 * get user by id
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.getUserById = function (req, res, next) {
    debug('EBUGGG');
    model.getUserById(req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

/**
 * create new user
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.createUser = function (req, res, next) {  
    model.createUser(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

/**
 * update user by id
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.updateUserbyId = function (req, res, next) {
    model.updateUserById(req.params.uid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

/**
 * delete user by id
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.deleteUserById = function (req, res, next) {
    model.deleteUserById(req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

/* Authetication */

/**
 * render the login page
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.getLogin = function (req, res, next) {
    res.render('login');
};

/**
 * authenticats user
 * first checks if user exists, then validates password, returns status 401 if fails
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.authenticate = function (req, res, next) {
    model.getUserByUsername(req.body.username, function (error, user) {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.status(401).send({message: 'User not found'});
        }
        model.comparePassword(req.body.password, user.password, function (result) {
            if (!result) {
                return res.status(401).send({message: 'Password mismatch'});
            }
            session.add(user, req);
            res.status(200).json(user);
        });
    });
};

/**
 * show sign up page
 * @param {object} req request
 * @param {object} res response
 * @param {function} next callback function
 */
exports.getSignup = function (req, res, next) {
    res.render('signup');
};

function checkSession(req, res, next) {
    debug(req.session);
    next();
}
exports.checkSession = checkSession;

function logout(req, res, next) {
    req.session.destroy();
    res.status(200).send('LOGGED OUT');
}
exports.logout = logout;

