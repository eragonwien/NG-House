var model = require('./bookmarkModel');

exports.createBookmark = function (req, res, next) {
    model.createBookmark(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getAllBookmarks = function (req, res, next) {
    model.getAllBookmarks(function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results);
    });
}

exports.getBookmarksByUser = function (req, res, next) {
    model.getBookmarksByUser(req.params.uid, function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results);
    });
}

exports.getBookmarkById = function (req, res, next) {
    model.getBookmarkById(req.params.bmid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.updateBookmarkById = function (req, res, next) {
    model.updateBookmarkById(req.params.bmid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.deleteBookmarkById = function (req, res, next) {
    model.deleteBookmarkById(req.params.bmid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}