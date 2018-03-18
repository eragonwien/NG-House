var pool = require('../../config/db').pool;
var addressModel = require('../address/addressModel');
exports.createHouse = function (house, done) {
	if (house.address_id) {
		return insertHouse(house, done);
	}
	// if no address id available, query for one first
	var address = {
		address: house.address,
		postal_code: house.postal_code,
		city: house.city,
		land: house.land
	}
	addressModel.createNewAddress(address, function (error, result) {
		if (error) {
			return done(error);
		}
		house.address_id = result.insertId;
		insertHouse(house, done);
	})
}

exports.insertHouse = insertHouse;
function insertHouse(house, done) {
	var cmd = 'INSERT INTO house(user_id, address_id, house_type_id, price, currency_id, bathrooms, bedrooms, size) VALUES(?,?,?,?,?,?,?,?);';
	var params = [house.user_id, house.address_id, house.house_type_id, house.price, house.currency_id, house.bathrooms, house.bedrooms, house.size];
	pool.query(cmd, params, function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};

exports.getAllHouses = function(done) {
	var cmd = 'SELECT house.id as id, house.user_id as user_id, house.address_id as address_id, house.house_type_id as house_type_id, house.currency_id as currency_id, ';
	cmd += 'house.price, house.bathrooms, house.bedrooms, house.size,';
	cmd += 'role.name as role,';
	cmd += 'currency.name as currency, currency.short as currency_short, ';
	cmd += 'house_type.name as house_type,';
	cmd += 'user.first_name as first_name, user.last_name as last_name, user.username as username,';
	cmd += 'user.password as password, user.email as email,';
	cmd += 'address.address as address, address.postal_code as postal_code, address.city as city, address.land as land ';
	cmd += 'FROM house INNER JOIN user ON house.user_id = user.id ';
	cmd += 'INNER JOIN address ON house.address_id = address.id ';
	cmd += 'INNER JOIN role ON user.role_id = role.id ';
	cmd += 'INNER JOIN house_type ON house.house_type_id = house_type.id ';
	cmd += 'INNER JOIN currency ON house.currency_id = currency.id ';
	cmd += 'ORDER BY house.id ASC;';
	pool.query(cmd, null, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
};

exports.getLastestHouses = function(count, done) {
	if (!count) {
		count = 100; // set 100 as default
	}
	var cmd = 'SELECT house.id as id, house.user_id as user_id, house.address_id as address_id, house.house_type_id as house_type_id, house.currency_id as currency_id, ';
	cmd += 'house.price, house.bathrooms, house.bedrooms, house.size,';
	cmd += 'role.name as role,';
	cmd += 'currency.name as currency, currency.short as currency_short, ';
	cmd += 'house_type.name as house_type,';
	cmd += 'user.first_name as first_name, user.last_name as last_name, user.username as username,';
	cmd += 'user.password as password, user.email as email,';
	cmd += 'address.address as address, address.postal_code as postal_code, address.city as city, address.land as land ';
	cmd += 'FROM house INNER JOIN user ON house.user_id = user.id ';
	cmd += 'INNER JOIN address ON house.address_id = address.id ';
	cmd += 'INNER JOIN role ON user.role_id = role.id ';
	cmd += 'INNER JOIN house_type ON house.house_type_id = house_type.id ';
	cmd += 'INNER JOIN currency ON house.currency_id = currency.id ';
	cmd += 'ORDER BY house.last_update DESC, house.id DESC LIMIT ' + count + ';';
	
	pool.query(cmd, [count], function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
};

exports.getHouseById = function(id, done) {
	var cmd = 'SELECT house.id as id, house.user_id as user_id, house.address_id as address_id, house.house_type_id as house_type_id, house.currency_id as currency_id, ';
	cmd += 'house.price, house.bathrooms, house.bedrooms, house.size,';
	cmd += 'role.name as role,';
	cmd += 'currency.name as currency, currency.short as currency_short, ';
	cmd += 'house_type.name as house_type,';
	cmd += 'user.first_name as first_name, user.last_name as last_name, user.username as username,';
	cmd += 'user.password as password, user.email as email,';
	cmd += 'address.address as address, address.postal_code as postal_code, address.city as city, address.land as land ';
	cmd += 'FROM house INNER JOIN user ON house.user_id = user.id ';
	cmd += 'INNER JOIN address ON house.address_id = address.id ';
	cmd += 'INNER JOIN role ON user.role_id = role.id ';
	cmd += 'INNER JOIN house_type ON house.house_type_id = house_type.id ';
	cmd += 'INNER JOIN currency ON house.currency_id = currency.id ';
	cmd += 'WHERE house.id=? LIMIT 1;';
	var params = [id];
	pool.query(cmd, params, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results[0]);
	});
};

exports.updateHouseById = function(id, house, done) {
	var cmd = 'UPDATE house SET user_id=?, address_id=?, house_type_id=?, price=?, currency_id=?, bathrooms=?, bedrooms=?, size=? WHERE id=?;';
	var params = [house.user_id, house.address_id, house.house_type_id, house.price, house.currency_id, house.bathrooms, house.bedrooms, house.size, id];
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
