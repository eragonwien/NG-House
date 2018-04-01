let model = require('./mailer.model');
let debug = require('debug')('mailer_controller');

/**
 * middleware for
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function send (req, res, next) {
    model.prepareEmail(req.body, function (error, result) {
        if (error) {
            return next(error);
        } 
        res.status(200).json({message: 'success'});
    });
}

module.exports = {send};