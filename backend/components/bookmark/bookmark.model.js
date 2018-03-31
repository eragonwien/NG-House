let pool = require('../../config/db').pool;
let debug = require('debug')('bookmark_model');

/**
 * create bookmark
 * @param {object} bookmark bookmark
 * @param {callback} done callback
 */
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

/**
 * get bookmarks
 * @param {number} count number of bookmark
 * @param {callback} done callback
 */
function getBookmarks(count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM get_bookmarks ORDER BY id LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

/**
 * get bookmark by id
 * @param {number} id bookmark id
 * @param {callback} done callback
 */
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

/**
 * get all bookmarks of user
 * @param {number} user_id user id
 * @param {callback} done callback
 */
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

/**
 * update bookmark by id   
 * @param {number} id bookmark id
 * @param {object} bookmark updated bookmark
 * @param {callback} done callback
 */
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

/**
 * delete bookmark by id
 * @param {number} id bookmark id
 * @param {callback} done callback
 */
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
