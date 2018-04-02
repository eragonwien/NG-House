let model = require('./user.model');
let debug = require('debug')('user_controller');

/**
 * middleware for getting user
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get (req, res, next) {
    if (req.params.uid) {
        if (process.env.NODE_ENV != 'test') {
            let user = req.session.user;
            if (user.role != 'Admin' && user.id != req.params.uid) {
                res.status(401).json({message: 'Access denied'});
                return;
            }
        }
        model.getUserById(req.params.uid, function (error, user) {
            if (error) {
                return next(error);
            }
            // remove password
            if (user) {
                delete user.password;
            }
            return res.status(200).json(user);
        });
    } else {
        model.getUsers(req.query.count, function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).json(results);
        });
    }
}

/**
 * middleware for creating user
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {  
    model.createUser(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for updating user
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateUserById(req.params.uid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}


/**
 * middleware for removing user
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteUserById(req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/* Authetication */


/**
 * middleware for render login page
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function getLogin (req, res, next) {
    res.render('login');
}

/**
 * middleware for rendering the sign up page
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function getSignup (req, res, next) {
    res.render('signup');
}

/**
 * middleware for authenticating user
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function authenticate (req, res, next) {
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
            delete user.password;
            if (process.env.NODE_ENV != 'test') {
                req.session.user = user; // add user to session
            }
            res.status(200).json(user);
        });
    });
}

/**
 * middleware for logging out
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function logout(req, res, next) {
    req.session.destroy();
    res.status(200).send('LOGGED OUT');
}

/**
 * middleware for checking user access
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function checkUser(req, res, next) {
    if (process.env.NODE_ENV == 'test') {
        return next();
    }
    if (req.session.user) {
        return next();
    }
    res.status(401).json({message: 'Access denied'});
}

/**
 * middleware for checking admin access
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function checkAdmin(req, res, next) {
    if (process.env.NODE_ENV == 'test') {
        return next();
    }
    checkUser(req, res, function () {
        let user = req.session.user;
        if (!user.role || user.role != 'Admin') {
            return res.status(401).json({message: 'Access denied'});
        }
        next();
    });
}

module.exports = {create, get, update, remove, authenticate, checkAdmin, checkUser, getLogin, logout, getSignup};