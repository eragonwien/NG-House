'use strict';

let model = require('./address.model');

/**
 * create new address
 * @param {object} req request
 * @param {object} res response
 * @param {routeCallback} next callback
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
 * get addresses
 * @param {object} req request
 * @param {object} res response
 * @param {routeCallback} next callback
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
 * update address
 * @param {object} req request
 * @param {object} res response
 * @param {routeCallback} next callback
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
 * delete address
 * @param {object} req request
 * @param {object} res response
 * @param {routeCallback} next callback
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