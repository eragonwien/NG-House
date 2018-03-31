let model = require('./role.model');

function create (req, res, next) {
    model.createRole(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result); 
    });
}

function get (req, res, next) {
    if (req.params.rid) {
        model.getRoleById(req.params.rid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result); 
         });
    } else {
        model.getAllRoles(function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result); 
         });
    }
}

function update (req, res, next) {
    model.updateRoleById(req.params.rid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
}

function remove (req, res, next) {
    model.deleteRoleById(req.params.rid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
}

module.exports = {create, get, update, remove};