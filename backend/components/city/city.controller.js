'use strict';

let model = require('./city.model');

/**
 * middleware for creating city
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create(req, res, next) {
    model.createCity(req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for getting city
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get(req, res, next) {

    if (req.params.ctid) {
        model.getCityById(req.params.ctid, function(error, result) {
            if (error) {
                next(error);
                return;
            }
            res.status(200).json(result);
            return;
        });
    } else {
        model.getCities(req.query.count, function(error, result) {
            if (error) {
                next(error);
                return;
            }
            res.status(200).json(result);
            return;
        });
    }
    
}

/**
 * middleware for updating city
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update(req, res, next) {
    model.updateCityById(req.params.ctid, req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for removing city
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove(req, res, next) {
    model.deleteCityById(req.params.ctid, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};