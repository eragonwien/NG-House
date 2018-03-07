var model = require('./offerStatusModel');

exports.createOfferStatus = function (req, res, next) {
    model.createOfferStatus(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.getAllOfferStatuses = function (req, res, next) {
    model.getAllOfferStatuses(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.getOfferStatusById = function (req, res, next) {
    model.getOfferStatusById(req.params.osid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.updateStatusById = function (req, res, next) {
    model.updateOfferStatusById(req.params.osid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.deleteStatusById = function (req, res, next) {
    model.deleteOfferStatusById(req.params.osid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};