var pool = require('../../config/db').pool;

exports.createRole = function (role, done) {
    var cmd = 'INSERT INTO role(name) VALUES (?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    var params = [role.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getAllRoles = function (done) {
    var cmd = 'SELECT * FROM role;';
    var params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.getRoleById = function (id, done) {
    var cmd = 'SELECT * FROM role WHERE id=?;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
};

exports.updateRoleById = function (id, role, done) {
    var cmd = 'UPDATE role SET name=? WHERE id=? LIMIT 1;';
    var params = [role.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};

exports.deleteRoleById = function (id, done) {
    var cmd = 'DELETE FROM role WHERE id=?;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
};