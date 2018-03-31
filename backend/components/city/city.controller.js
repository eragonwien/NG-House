'use strict';

let model = require('./city.model');

function create(req, res, next) {
    model.createCity(req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

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

function update(req, res, next) {
    model.updateCityById(req.params.ctid, req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

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