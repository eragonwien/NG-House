let model = require('./house.status.model');

/**
 * middleware for
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {
    model.createHouseStatus(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
}

/**
 * middleware for getting house status
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get (req, res, next) {
    if (req.params.hsid) {
        model.getHouseStatusById(req.params.hsid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    } else {
        model.getHouseStatuses(req.query.count, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    }   
}

/**
 * middleware for updating house status
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateHouseStatusById(req.params.hsid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for removing house status
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteHouseStatusById(req.params.hsid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};

