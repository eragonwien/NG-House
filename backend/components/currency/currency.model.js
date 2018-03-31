let pool = require('../../config/db').pool;

/**
 * create currency
 * @param {object} currency currency
 * @param {callback} done callback
 */
function createCurrency (currency, done) {
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

/**
 * get currencies
 * @param {number} count number of currencies
 * @param {callback} done callback
 */
function getCurrencies (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM currency LIMIT ' + count + ';';
    pool.query(cmd, null, function (error, results) {
        if (error) {
            return done(error);
        }
        done(null, results);
    });
}

/**
 * get currency by id
 * @param {number} id currency id
 * @param {callback} done callback
 */
function getCurrencyById (id, done) {
    let cmd = 'SELECT * FROM currency WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * update currency by id
 * @param {number} id currency id
 * @param {object} currency updated currency
 * @param {callback} done callback
 */
function updateCurrencyById (id, currency, done) {
    let cmd = 'UPDATE currency SET name=?, short=? WHERE id=?;';
    let params = [currency.name, currency.short, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete currency by id
 * @param {number} id currency id
 * @param {callback} done callback
 */
function deleteCurrencyById (id, done) {
    let cmd = 'DELETE FROM currency WHERE id=?;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createCurrency, getCurrencies, getCurrencyById, updateCurrencyById, deleteCurrencyById };