var debug = require('debug')('session');

var config = {
    secret: (process.env.SESSION_SECRET) ? process.env.SESSION_SECRET : 'millenium_balkon',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: (process.env.COOKIE_MAX_AGE) ? process.env.COOKIE_MAX_AGE : 60000
    }
};
exports.config = config;

function refresh(req, res, next) {
    debug(req.session);
    next();
}
exports.refresh = refresh;

/**
 * add user to request session
 * @param {object} user user
 * @param {object} req request
 */
function add(user, req) {
    req.session.user = user;
}
exports.add = add;
