'use strict';

let model = require('./postal.code.model');

function create(req, res, next) {
    model.createPostalCode(req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

function get(req, res, next) {

    if (req.params.pcid) {
        model.getPostalCodeById(req.params.pcid, function(error, result) {
            if (error) {
                next(error);
                return;
            }
            res.status(200).json(result);
            return;
        });
    } else {
        model.getPostalCodes(req.query.count, function(error, result) {
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
    model.updatePostalCodeById(req.params.pcid, req.body, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

function remove(req, res, next) {
    model.deletePostalCodeById(req.params.pcid, function(error, result) {
        if (error) {
            next(error);
            return;
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};