let model = require('./house.status.model');

function create (req, res, next) {
    model.createHouseStatus(req.body, function (error, result) {
       if (error) {
           return next(error);
       }
       res.status(200).json(result);
    });
}

function get (req, res, next) {
    model.getAllHouseStatuses(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function getHouseStatusById (req, res, next) {
    model.getHouseStatusById(req.params.hsid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function update (req, res, next) {
    model.updateHouseStatusById(req.params.hsid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function remove (req, res, next) {
    model.deleteHouseStatusById(req.params.hsid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};

