let pool = require('../../config/db').pool;
let debug = require('debug')('bookmark_model');

function createBookmark(bookmark, done) {
    let cmd = 'INSERT INTO bookmark(user_id, house_id) VALUES(?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);'; 
    let params = [bookmark.user_id, bookmark.house_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function getBookmarks(count, done) {
    let cmd = 'SELECT * FROM get_bookmarks ORDER BY id ';

    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

function getBookmarkById(id, done) {
    let cmd = 'SELECT * FROM get_bookmarks WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results[0]);
    });
}

function getBookmarksByUser(user_id, done) {
    let cmd = 'SELECT * FROM get_bookmarks WHERE bookmarker_id=?;';
    let params = [user_id];
    pool.query(cmd, params, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

function updateBookmarkById(id, bookmark, done) {
    let cmd = 'UPDATE bookmark SET user_id=?, house_id=? WHERE id=?;';
    let params = [bookmark.user_id, bookmark.house_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function deleteBookmarkById(id, done) {
    let cmd = 'DELETE FROM bookmark WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}
module.exports = {createBookmark, getBookmarks, getBookmarkById, getBookmarksByUser, updateBookmarkById, deleteBookmarkById};
