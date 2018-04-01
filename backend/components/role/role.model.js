let pool = require('../../config/db').pool;

/**
 * create role
 * @param {object} role role
 * @param {callback} done callback
 */
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

/**
 * get roles
 * @param {number} count query limit
 * @param {callback} done callback
 */
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

/**
 * get role by id
 * @param {number} id role id
 * @param {callback} done callback
 */
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

/**
 * update role by id
 * @param {number} id role id
 * @param {object} role updated role
 * @param {callback} done callback
 */
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

/**
 * delete role by id
 * @param {number} id role id
 * @param {callback} done callback
 */
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