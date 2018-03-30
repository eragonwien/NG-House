let model = require('./houseStatusModel');

exports.createHouseStatus = function (req, res, next) {
    model.createHouseStatus(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
};

exports.getAllHouseStatuses = function (req, res, next) {
    model.getAllHouseStatuses(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.getHouseStatusById = function (req, res, next) {
    model.getHouseStatusById(req.params.hsid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.updateHouseStatusById = function (req, res, next) {
    model.updateHouseStatusById(req.params.hsid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.deleteHouseStatusById = function (req, res, next) {
    model.deleteHouseStatusById(req.params.hsid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

