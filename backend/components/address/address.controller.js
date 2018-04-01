'use strict';

let model = require('./address.model');

/**
 * middleware for creating address
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {
    model.createNewAddress(req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for getting address
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get (req, res, next) {
    if (req.params.aid) {
        model.getAddressById(req.params.aid, function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).json(results);
        });
    } else {
        model.getAddresses(req.query.count, function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).json(results)
        });
    }
    
}

/**
 * middleware for updating address
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateAddressById(req.params.aid, req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for removing address
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteAddressById(req.params.aid, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove };