let model = require('./currency.model');

function create (req, res, next) {
    model.createCurrency(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function get (req, res, next) {
    if (req.params.cid) {
        model.getCurrencyById(req.params.cid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    } else {
        model.getCurrencies(req.query.count, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    }
}
function update (req, res, next) {
    model.updateCurrencyById(req.params.cid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function remove (req, res, next) {
    model.deleteCurrencyById(req.params.cid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};