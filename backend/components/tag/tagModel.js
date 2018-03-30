let pool = require('../../config/db').pool;

exports.createTag = function (tag, done) {
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

exports.getAllTags = function (done) {
    let cmd = 'SELECT * FROM tag;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

exports.getTagById = function (id, done) {
    let cmd = 'SELECT * FROM tag WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

exports.updateTagById = function (id, tag, done) {
    let cmd = 'UPDATE tag SET name=? WHERE id=?;';
    let params = [tag.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

exports.deleteTagById = function (id, done) {
    let cmd = 'DELETE FROM tag WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}