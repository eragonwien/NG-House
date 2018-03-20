var pool = require('../../config/db').pool;
var addressModel = require('../address/addressModel');

/**
 * add a new house
 * @param {object} house house object
 * @param {function} done callback function
 */
function createHouse(house, done) {
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
exports.createHouse = createHouse;

/**
 * insert a new house
 * @param {object} house object house
 * @param {callback} done callback function
 */
function insertHouse(house, done) {
	var cmd = 'INSERT INTO house(user_id, address_id, house_type_id, price, currency_id, rooms, bathrooms, bedrooms, size) VALUES(?,?,?,?,?,?,?,?,?);';
	var params = [house.user_id, house.address_id, house.house_type_id, house.price, house.currency_id, house.rooms, house.bathrooms, house.bedrooms, house.size];
	pool.query(cmd, params, function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};
exports.insertHouse = insertHouse;

/**
 * get houses based on paramters
 * @param {object} params parameter of query string
 * @param {function} done callback function
 */
function getHouses(params, done) {
	if (!params) {
		return getAllHouses(done);
	}
	searchHouses(params);
}
exports.getHouses = getHouses;

/**
 * get all houses
 * @param {function} done callback function
 */
function getAllHouses(done) {
	var cmd = 'SELECT * FROM get_houses;';
	pool.query(cmd, null, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
};
exports.getAllHouses = getAllHouses;

/**
 * search houses by parameters
 * @param {?object} params search parameters
 * @param {function} done callback function
 */
function searchHouses(params, done) {
	if (!params) {
		return getAllHouses(done);
	}
	var cmd = 'SELECT * FROM get_houses ';

	// create where clauses
	var whereClause = getWhereClause(params);
	if (whereClause.params.length > 0) {
		cmd += whereClause.clause;		
	}
	cmd += ' ORDER BY house.last_update DESC ';

	// set limit
	if (params.limit) {
		cmd += 'LIMIT ' + params.limit;
	}
	// close up
	cmd += ';';
	
	pool.query(cmd, whereClause.params, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});

	/**
	 * use parameters to create a where clause string
	 * @param {string} params parameters as json string
	 * @returns {object} object contains string and params
	 */
	function getWhereClause(params) {
		var jsonParams = JSON.parse(params);
		params = [];
		var clauses = [];
		var str = "WHERE ";
		
		if (jsonParams.city) {
			clauses.push('address.city=?');
			params.push(jsonParams.city);
		}
		if (jsonParams.land) {
			clauses.push('address.land=?');
			params.push(jsonParams.land);			
		}
		if (jsonParams.minSize) {
			clauses.push('house.size>=?');
			params.push(jsonParams.minSize);			
		}
		if (jsonParams.maxPrice) {
			clauses.push('house.price<=?');
			params.push(jsonParams.maxPrice);		
		}
		if (jsonParams.currency_id) {
			clauses.push('house.currency_id=?');
			params.push(jsonParams.currency_id);			
		}
		if (jsonParams.house_type_id) {
			clauses.push('house.house_type_id=?');
			params.push(jsonParams.house_type_id);			
		}
		if (jsonParams.rooms) {
			clauses.push('house.rooms >= ?');
			params.push(jsonParams.bathrooms);						
		}
		if (jsonParams.bathrooms) {
			clauses.push('house.bathrooms >= ?');
			params.push(jsonParams.bathrooms);						
		}
		if (jsonParams.bedrooms) {
			clauses.push('house.bedrooms >= ?');
			params.push(jsonParams.bedrooms);			
		}
		for (let i = 0; i < clauses.length; i++) {
			if (i > 0) {
				str += ' AND ';
			}
			str += clauses[i];
		}
		var result = {
			clause: str,
			params: params
		}
		return result;
	}
}
exports.searchHouses = searchHouses;

/**
 * get house by id
 * @param {number} id id of the house
 * @param {function} done callback
 */
function getHouseById(id, done) {
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
exports.getHouseById = getHouseById;

/**
 * update house by id
 * @param {number} id id of the house
 * @param {object} house the updated house object
 * @param {function} done call back function
 */
function updateHouseById(id, house, done) {
	var cmd = 'UPDATE house SET user_id=?, address_id=?, house_type_id=?, price=?, currency_id=?, bathrooms=?, bedrooms=?, size=? WHERE id=?;';
	var params = [house.user_id, house.address_id, house.house_type_id, house.price, house.currency_id, house.bathrooms, house.bedrooms, house.size, id];
	pool.query(cmd, params, function(error, result) {
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};
exports.updateHouseById = updateHouseById;

/**
 * delete house by id
 * @param {number} id id of the house
 * @param {function} done callback function
 */
function deleteHouseById(id, done) {
	var cmd = 'DELETE FROM house WHERE id=? LIMIT 1;';
	var params = [id];
	pool.query(cmd, params, function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};
exports.deleteHouseById = deleteHouseById;
