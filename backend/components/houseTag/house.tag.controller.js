let model = require('./house.tag.model');

/**
 * middleware for creating house tag
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {
    model.createHouseTag(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
}

/**
 * middleware for getting house tags
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get (req, res, next) {
    if (req.params.htid) {
        model.getHouseTagById(req.params.htid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    } else {
        model.getHouseTags(req.query.count, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    }
}

/**
 * middleware for updating house tag
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
    model.updateHouseTagById(req.params.htid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * middleware for removing house tag
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
    model.deleteHouseTagById(req.params.htid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};

