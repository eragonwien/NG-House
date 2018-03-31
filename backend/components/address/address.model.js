let pool = require('../../config/db').pool;

function createNewAddress (address, done) {
    let cmd = 'INSERT INTO address(address, postal_code, city, land) VALUES (?, ?, ?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';
    let params = [address.address, address.postal_code, address.city, address.land];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function getAddresses (count, done) {
    if (!count) {
        count = 1000;
    }
    let cmd = 'SELECT * FROM get_addresses LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

function getAddressById (id, done) {
    let cmd = 'SELECT * FROM get_addresses WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

function getAddressIdByAddress (address, done) {
    let cmd = 'SELECT id FROM get_addresses WHERE street_name=? AND house_number=? AND postal_code_code=? AND city_name=? AND land_name=? LIMIT 1;';
    let params = [address.street_name, address.house_number, address.postal_code_code, address.city_name, address.land_name];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

function updateAddressById (id, address, done) {
    let cmd = 'UPDATE address ';
    cmd += 'SET street_name=?, house_number=?, postal_code_id=? WHERE id=?;';
    let params = [address.street_name, address.house_number, address.postal_code_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

function deleteAddressById (id, done) {
    let cmd = 'DELETE FROM address WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createNewAddress, getAddressById, getAddressIdByAddress, getAddresses, updateAddressById, deleteAddressById};