var model = require('./tagModel');

exports.createTag = function (req, res, next) {
    model.createTag(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getAllTags = function (req, res, next) {
    model.getAllTags(function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getTagById = function (req, res, next) {
    model.getTagById(req.params.tid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.updateTagById = function (req, res, next) {
    model.updateTagById(req.params.tid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.deleteTagById = function (req, res, next) {
    model.deleteTagById(req.params.tid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}