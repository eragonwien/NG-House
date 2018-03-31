let pool = require('../../config/db').pool;

exports.createRole = function (role, done) {
    let cmd = 'INSERT INTO role(name) VALUES (?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [role.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getAllRoles = function (done) {
    let cmd = 'SELECT * FROM role;';
    let params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getRoleById = function (id, done) {
    let cmd = 'SELECT * FROM role WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
};

exports.updateRoleById = function (id, role, done) {
    let cmd = 'UPDATE role SET name=? WHERE id=? LIMIT 1;';
    let params = [role.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.deleteRoleById = function (id, done) {
    let cmd = 'DELETE FROM role WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};