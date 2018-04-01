let model = require('./house.type.model');

/**
 * middleware for creating house type
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {
    model.createHouseType(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
}

/**
 * middleware for getting house types
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get (req, res, next) {
    if (req.params.htid) {
        model.getHouseTypeById(req.params.htid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    } else {
        model.getHouseTypes(req.query.count, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    }
}

/**
 * middleware for updating house type
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateHouseTypeById(req.params.htid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for removing house type
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteHouseTypeById(req.params.htid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};

