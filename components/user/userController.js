var model = require('./userModel');

exports.getAllUsers = function (req, res, next) {
    model.getAllUsers(function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results);
    })
}

exports.getUserById = function (req, res, next) {
    model.getUserById(req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.createUser = function (req, res, next) {
    model.createUser(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.updateUserbyId = function (req, res, next) {
    model.updateUserById(req.params.uid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.deleteUserById = function (req, res, next) {
    model.deleteUserById(req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}