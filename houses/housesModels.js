var pool = require('../config/db');
exports.getAllHouses = function(done) {
	var cmd = 'SELECT * FROM Houses';
	pool.query(cmd, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
}

exports.getHouseByID = function(id, done) {
	var cmd = 'SELECT * FROM Houses WHERE ID=?;';
	pool.query(cmd, [id], function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
}

exports.createNewHouse = function(house, done) {
	var cmd = 'INSERT INTO Houses(Price, Type, Address, Description, Bathrooms, Bedrooms, Area) VALUES (?,?,?,?,?,?,?)';
	pool.query(cmd, [house.Price, house.Type, house.Address, house.Description, house.Bathrooms, house.Bedrooms, house.Area], function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
}

exports.updateHouseById = function(id, house, done) {
	var cmd = 'UPDATE Houses SET Price=?, Type=?, Address=?, Description=?, Bathrooms=?, Bedrooms=?, Area=? WHERE ID=?;';
	pool.query(cmd, [house.Price, house.Type, house.Address, house.Description, house.Bathrooms, house.Bedrooms, house.Area, id], function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
}

exports.deleteHouseById = function(id, done) {
	var cmd = 'DELETE FROM Houses WHERE ID=?;';
	pool.query(cmd, [id], function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
}