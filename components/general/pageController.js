var userModel = require('../user/userModel');

exports.getIndex = function (req, res, next) {
    res.render('index');
};

exports.getLogin = function (req, res, next) {
    res.render('login');
};

exports.authenticate = function (req, res, next) {
    userModel.getUserByUsername(req.body.username, function (error, user) {
        if (error) {
            return next(error);
        }
        if (!user) {
            res.status(401).send({message: 'User not found'});
            return;
        }
        comparePassword(req.body.password, user.password, function (result) {
            if (!result) {
                return res.status(401).send({message: 'Password mismatch'});
            }
            res.status(200).json(user);
        })
    })
};

exports.getSignup = function (req, res, next) {
    res.render('signup');
};

function comparePassword(input, hash, next) {
    next(input == hash);
}
