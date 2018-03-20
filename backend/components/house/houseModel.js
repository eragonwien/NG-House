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
	searchHouses(params, done);
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
	cmd += ' ORDER BY last_update DESC, id ASC ';

	// set limit
	if (params.limit) {
		cmd += 'LIMIT ' + params.limit;
	}
	// close up
	cmd += ';';
	console.log(cmd);
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
		var clauses = [];
		var clausesParams = [];
		var str = "WHERE ";
		
		if (params.city) {
			clauses.push('address.city=?');
			clausesParams.push(params.city);
		}
		if (params.land) {
			clauses.push('address.land=?');
			clausesParams.push(params.land);			
		}
		if (params.minSize) {
			clauses.push('house.size>=?');
			clausesParams.push(params.minSize);			
		}
		if (params.maxPrice) {
			clauses.push('house.price<=?');
			clausesParams.push(params.maxPrice);		
		}
		if (params.currency_id) {
			clauses.push('house.currency_id=?');
			clausesParams.push(params.currency_id);			
		}
		if (params.house_type_id) {
			clauses.push('house.house_type_id=?');
			clausesParams.push(params.house_type_id);			
		}
		if (params.rooms) {
			clauses.push('house.rooms >= ?');
			clausesParams.push(params.bathrooms);						
		}
		if (params.bathrooms) {
			clauses.push('house.bathrooms >= ?');
			clausesParams.push(params.bathrooms);						
		}
		if (params.bedrooms) {
			clauses.push('house.bedrooms >= ?');
			clausesParams.push(params.bedrooms);			
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
