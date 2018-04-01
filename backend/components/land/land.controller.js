'use strict';

let model = require('./land.model');

/**
 * middleware for
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create(req, res, next) {
    model.createLand(req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get(req, res, next) {

    if (req.params.lid) {
        model.getLandById(req.params.lid, function(error, result) {
            if (error) {
                next(error);
                return;
            }
            res.status(200).json(result);
            return;
        });
    } else {
        model.getLands(req.query.count, function(error, result) {
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
 * middleware for
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update(req, res, next) {
    model.updateLandById(req.params.lid, req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove(req, res, next) {
    model.deleteLandById(req.params.lid, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};