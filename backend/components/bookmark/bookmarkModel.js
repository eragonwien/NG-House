var pool = require('../../config/db').pool;

function createBookmark(bookmark, done) {
    var cmd = 'INSERT INTO bookmark(user_id, house_id) VALUES(?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    var params = [bookmark.user_id, bookmark.house_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}
exports.createBookmark = createBookmark;

function getAllBookmarks(done) {
    var cmd = 'SELECT * FROM get_bookmarks ORDER BY id;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}
exports.getAllBookmarks = getAllBookmarks;

function getBookmarkById(id, done) {
    var cmd = 'SELECT * FROM get_bookmarks WHERE id=?;';
    var params = [id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    });
}
exports.getBookmarkById = getBookmarkById;

function getBookmarksByUser(user_id, done) {
    var cmd = 'SELECT * FROM get_bookmarks WHERE bookmarker_id=?;';
    var params = [user_id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}
exports.getBookmarksByUser = getBookmarksByUser;

function updateBookmarkById(id, bookmark, done) {
    var cmd = 'UPDATE bookmark SET user_id=?, house_id=? WHERE id=?;';
    var params = [bookmark.user_id, bookmark.house_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}
exports.updateBookmarkById = updateBookmarkById;

function deleteBookmarkById(id, done) {
    var cmd = 'DELETE FROM bookmark WHERE id=?;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}
exports.deleteBookmarkById = deleteBookmarkById;

