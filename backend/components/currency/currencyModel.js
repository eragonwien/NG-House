var pool = require('../../config/db').pool;

exports.createCurrency = function (currency, done) {
    var cmd = 'INSERT INTO currency(name, short) VALUES (?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';    
    var params = [currency.name, currency.short];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

exports.getAllCurrencies = function (done) {
    var cmd = 'SELECT * FROM currency;';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

exports.getCurrencyById = function (id, done) {
    var cmd = 'SELECT * FROM currency WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

exports.updateCurrency = function (id, currency, done) {
    var cmd = 'UPDATE currency SET name=?, short=? WHERE id=?;';
    var params = [currency.name, currency.short, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

exports.deleteCurrencyById = function (id, done) {
    var cmd = 'DELETE FROM currency WHERE id=?;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}