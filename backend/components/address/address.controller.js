'use strict';

let model = require('./address.model');

function createAddress (req, res, next) {
    model.createNewAddress(req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

function getAddresses (req, res, next) {
    model.getAddresses(req.query.count, function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results)
    });
}

function getAddressById (req, res, next) {
    model.getAddressById(req.params.aid, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);   
    });
}

function getAddressIdByAddress (req, res, next) {
    model.getAddressIdByAddress(req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

function updateAddressById (req, res, next) {
    model.updateAddressById(req.params.aid, req.body, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

function deleteAddressById (req, res, next) {
    model.deleteAddressById(req.params.aid, function (error, result) {
        if (error) {
            return next(result);
        }
        res.status(200).json(result);
    });
}

module.exports = {createAddress, getAddressById, getAddresses, getAddressIdByAddress, updateAddressById, deleteAddressById };