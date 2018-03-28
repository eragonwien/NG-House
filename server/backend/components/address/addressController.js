var model = require('./addressModel');

exports.createAddress = function (req, res, next) {
    model.createNewAddress(req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
};

exports.getAllAddresses = function (req, res, next) {
    if (req.query.distinct == 'true') {
        return model.getDistinctCities(function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).json(results);
        });
    }
    model.getAllAddresses(function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results)
    });
};

exports.getAddressById = function (req, res, next) {
    model.getAddressById(req.params.aid, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);   
    });
};

exports.getAddressIdByAddress = function (req, res, next) {
    model.getAddressIdByAddress(req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
};

exports.updateAddressById = function (req, res, next) {
    model.updateAddressById(req.params.aid, req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
};

exports.deleteAddressById = function (req, res, next) {
    model.deleteAddressById(req.params.aid, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
};