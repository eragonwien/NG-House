let pool = require('../../config/db').pool;

/**
 * create new tag
 * @param {object} tag tag
 * @param {callback} done callback
 */
function createTag (tag, done) {
    let cmd = 'INSERT INTO tag(name) VALUES (?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [tag.name, tag.short];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get tags
 * @param {number} count query limit
 * @param {callback} done callback
 */
function getTags (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM tag LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

/**
 * get tag by id
 * @param {number} id tag id
 * @param {callback} done callback
 */
function getTagById (id, done) {
    let cmd = 'SELECT * FROM tag WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * update tag by id
 * @param {number} id tag id
 * @param {object} tag updated tag
 * @param {callback} done callback
 */
function updateTagById (id, tag, done) {
    let cmd = 'UPDATE tag SET name=? WHERE id=?;';
    let params = [tag.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete tag by id
 * @param {number} id tag id
 * @param {callback} done callback
 */
function deleteTagById (id, done) {
    let cmd = 'DELETE FROM tag WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createTag, getTags, getTagById, updateTagById, deleteTagById};