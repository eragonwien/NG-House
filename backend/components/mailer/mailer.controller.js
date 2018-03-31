let model = require('./mailer.model');
let debug = require('debug')('mailer_controller');

function sendMail (req, res, next) {
    model.prepareEmail(req.body, function (error, result) {
        if (error) {
            return next(error);
        } 
        res.status(200).json({message: 'success'});
    });
};