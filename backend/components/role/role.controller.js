let model = require('./role.model');

/**
 * create role
 * @param {object} req request
 * @param {object} res response
 * @param {function} next middleware function
 */
function create (req, res, next) {
    model.createRole(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result); 
    });
}

/**
 * get role
 * @param {object} req request
 * @param {object} res response
 * @param {function} next middleware function
 */
function get (req, res, next) {
    if (req.params.rid) {
        model.getRoleById(req.params.rid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result); 
         });
    } else {
        model.getRoles(req.query.count, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result); 
         });
    }
}

/**
 * update role
 * @param {object} req request
 * @param {object} res response
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateRoleById(req.params.rid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
}

/**
 * remove role
 * @param {object} req request
 * @param {object} res response
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteRoleById(req.params.rid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result); 
     });
}

module.exports = {create, get, update, remove};