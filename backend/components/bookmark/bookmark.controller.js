let model = require('./bookmark.model');

/**
 * middleware for creating bookmark
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
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
 * middleware for getting bookmarks
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
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
 * middleware for updating bookmark
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
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
 * middleware for removing bookmark
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
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