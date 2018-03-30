let model = require('./mailerModel');
let debug = require('debug')('mailer_controller');

exports.sendMail = function (req, res, next) {
    model.prepareEmail(req.body, function (error, result) {
        if (error) {
            return next(error);
        } 
        res.status(200).json({message: 'success'});
    });
};