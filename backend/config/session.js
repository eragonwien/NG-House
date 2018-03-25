var debug = require('debug')('session');

function refresh(req, res, next) {
    console.log('SESSION: ' + JSON.stringify(req.session));
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
