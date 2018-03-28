var model = require('./currencyModel');

exports.createCurrency = function (req, res, next) {
    model.createCurrency(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getAllCurrencies = function (req, res, next) {
    model.getAllCurrencies(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getCurrencyById = function (req, res, next) {
    model.getCurrencyById(req.params.cid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.updateCurrency = function (req, res, next) {
    model.updateCurrency(req.params.cid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.deleteCurrency = function (req, res, next) {
    model.deleteCurrencyById(req.params.cid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}