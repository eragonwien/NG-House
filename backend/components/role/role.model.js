let pool = require('../../config/db').pool;

function createRole (role, done) {
    let cmd = 'INSERT INTO role(name) VALUES (?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [role.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function getRoles (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM role LIMIT ' + count + ';';
    let params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function getRoleById (id, done) {
    let cmd = 'SELECT * FROM role WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

function updateRoleById (id, role, done) {
    let cmd = 'UPDATE role SET name=? WHERE id=? LIMIT 1;';
    let params = [role.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function deleteRoleById (id, done) {
    let cmd = 'DELETE FROM role WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createRole, getRoles, getRoleById, updateRoleById, deleteRoleById};