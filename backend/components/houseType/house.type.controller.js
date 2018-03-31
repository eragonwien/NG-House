let model = require('./house.type.model');

function create (req, res, next) {
    model.createHouseType(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
}

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

function update (req, res, next) {
    model.updateHouseTypeById(req.params.htid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function remove (req, res, next) {
    model.deleteHouseTypeById(req.params.htid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};

