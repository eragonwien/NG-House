let model = require('./role.model');

exports.createRole = function (req, res, next) {
    model.createRole(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result); 
    });
};

exports.getAllRoles = function (req, res, next) {
    model.getAllRoles(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
};

exports.getRoleById = function (req, res, next) {
    model.getRoleById(req.params.rid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
};

exports.updateRoleById = function (req, res, next) {
    model.updateRoleById(req.params.rid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
};

exports.deleteRoleById = function (req, res, next) {
    model.deleteRoleById(req.params.rid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
};