var pool = require('../../config/db').pool;

exports.createOffer = function (offer, done) {
    var cmd = 'INSERT INTO offer(user_id, house_id, price, offer_status_id, currency_id) VALUES(?, ?, ?, ?, ?);';
    var params = [offer.user_id, offer.house_id, offer.price, offer.offer_status_id, offer.currency_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};

exports.getAllOffer = function (done) {
    var cmd = 'SELECT * FROM offer;';
    var params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};

exports.getOfferById = function (id, done) {
    var cmd = 'SELECT * FROM offer WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result[0]);
    });
};

exports.updateOfferById = function (id, offer, done) {
    var cmd = 'UPDATE offer SET user_id=?, house_id=?, price=?, offer_status_id=?, currency_id=? WHERE id=?;'
    var params = [offer.user_id, offer.house_id, offer.price, offer.offer_status_id, offer.currency_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};

exports.deleteOfferById = function (id, done) {
    var cmd = 'DELETE FROM offer WHERE id=? LIMIT 1;';
    var params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        } 
        done(null, result);
    });
};