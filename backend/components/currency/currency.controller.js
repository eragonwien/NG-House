let model = require('./currency.model');

/**
 * middleware for creating currency
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {
    model.createCurrency(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for getting currency
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
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

/**
 * middleware for updating currency
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateCurrencyById(req.params.cid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for deleting currency
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteCurrencyById(req.params.cid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};