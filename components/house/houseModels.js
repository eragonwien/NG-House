var pool = require('../../config/db').pool;

exports.createHouse = function(house, done) {
	var cmd = 'INSERT INTO house(user_id, address_id, house_type_id, bathrooms, bedrooms, size) VALUES(?,?,?,?,?,?);';
	var params = [house.user_id, house.address_id, house.house_type_id, house.bathrooms, house.bedrooms, house.size];
	pool.query(cmd, params, function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};

exports.getAllHouses = function(done) {
	var cmd = 'SELECT * FROM house;';
	pool.query(cmd, null, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
};

exports.getHouseById = function(id, done) {
	var cmd = 'SELECT * FROM house WHERE id=? LIMIT 1;';
	var params = [id];
	pool.query(cmd, params, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results[0]);
	});
};

exports.updateHouseById = function(id, house, done) {
	var cmd = 'UPDATE house SET user_id=?, address_id=?, house_type_id=?, bathrooms=?, bedrooms=?, size=? WHERE id=?;';
	var params = [house.user_id, house.address_id, house.house_type_id, house.bathrooms, house.bedrooms, house.size, id];
	pool.query(cmd, params, function(error, result) {
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};

exports.deleteHouseById = function(id, done) {
	var cmd = 'DELETE FROM house WHERE id=? LIMIT 1;';
	var params = [id];
	pool.query(cmd, params, function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};
