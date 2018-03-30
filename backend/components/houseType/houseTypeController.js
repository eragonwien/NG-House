let model = require('./houseTypeModel');

exports.createHouseType = function (req, res, next) {
    model.createHouseType(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
};

exports.getAllHouseType = function (req, res, next) {
    model.getAllHouseType(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.getHouseTypeById = function (req, res, next) {
    model.getHouseTypeById(req.params.htid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.updateHouseTypeById = function (req, res, next) {
    model.updateHouseTypeById(req.params.htid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.deleteHouseTypeById = function (req, res, next) {
    model.deleteHouseTypeById(req.params.htid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

