let model = require('./bookmark.model');

/**
 * create new bookmark
 * @param {object} req request
 * @param {object} res response
 * @param {callback} next callback
 */
function create (req, res, next) {
    model.createBookmark(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * get bookmark
 * @param {object} req request
 * @param {object} res response
 * @param {callback} next callback
 */
function get (req, res, next) {
    if (req.params.bmid) {
        model.getBookmarkById(req.params.bmid, function (error, result) {
            if (error) {
                return next(error);
            }
            res.status(200).json(result);
        });
    } else if (req.params.uid) {
        model.getBookmarksByUser(req.params.uid, function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).json(results);
        });
    } else {
        model.getBookmarks(req.query.count, function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).json(results);
        });
    }
}

/**
 * update new bookmark
 * @param {object} req request
 * @param {object} res response
 * @param {callback} next callback
 */
function update (req, res, next) {
    model.updateBookmarkById(req.params.bmid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

/**
 * delete bookmark
 * @param {object} req request
 * @param {object} res response
 * @param {callback} next callback
 */
function remove (req, res, next) {
    model.deleteBookmarkById(req.params.bmid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

module.exports = {create, get, update, remove};