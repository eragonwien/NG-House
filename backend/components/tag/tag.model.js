let pool = require('../../config/db').pool;

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