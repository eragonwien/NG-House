let pool = require('../../config/db').pool;

function createHouseStatus (house_status, done) {
    let cmd = 'INSERT INTO house_status(name) VALUES(?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);'
    let params = [house_status.name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function getHouseStatuses (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM house_status;';
    let params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function getHouseStatusById (id, done) {
    let cmd = 'SELECT * FROM house_status WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

function updateHouseStatusById (id, house_status, done) {
    let cmd = 'UPDATE house_status SET name=? WHERE id=?';
    let params = [house_status.name, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function deleteHouseStatusById (id, done) {
    let cmd = 'DELETE FROM house_status WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createHouseStatus, getHouseStatuses, getHouseStatusById, updateHouseStatusById, deleteHouseStatusById};

