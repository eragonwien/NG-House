let pool = require('../../config/db').pool;

exports.createCurrency = function (currency, done) {
    let cmd = 'INSERT INTO currency(name, short) VALUES (?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    let params = [currency.name, currency.short];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

exports.getAllCurrencies = function (done) {
    let cmd = 'SELECT * FROM currency;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

exports.getCurrencyById = function (id, done) {
    let cmd = 'SELECT * FROM currency WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

exports.updateCurrencyById = function (id, currency, done) {
    let cmd = 'UPDATE currency SET name=?, short=? WHERE id=?;';
    let params = [currency.name, currency.short, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

exports.deleteCurrencyById = function (id, done) {
    let cmd = 'DELETE FROM currency WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}