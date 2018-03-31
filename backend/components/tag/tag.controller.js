var model = require('./tag.model');

function create (req, res, next) {
    model.createTag(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function get (req, res, next) {
    if (req.params.tid) {
        model.getTagById(req.params.tid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    } else {
        model.getAllTags(function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    }
}

function update (req, res, next) {
    model.updateTagById(req.params.tid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

function remove (req, res, next) {
    model.deleteTagById(req.params.tid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};