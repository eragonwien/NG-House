var model = require('./offerModel');

exports.createOffer = function (req, res, next) {
    model.createOffer(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.getAllOffer = function (req, res, next) {
    model.getAllOffer(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.getOfferById = function (req, res, next) {
    model.getOfferById(req.params.oid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.updateOfferById = function (req, res, next) {
    model.updateOfferById(req.params.oid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};

exports.deleteOfferById = function (req, res, next) {
    model.deleteOfferById(req.params.oid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
};