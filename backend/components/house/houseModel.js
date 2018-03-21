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
	var cmd = 'INSERT INTO house(price, rooms, bathrooms, bedrooms, size, user_id, address_id, house_type_id, house_status_id, currency_id) VALUES(?,?,?,?,?,?,?,?,?,?);';
	var params = [house.price, house.rooms, house.bathrooms, house.bedrooms, house.size, house.user_id, house.address_id, house.house_type_id, house.house_status_id, house.currency_id];
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
	var jsonParams = JSON.parse(params);
	var whereClause = getWhereClause(params);
	if (whereClause.params.length > 0) {
		cmd += whereClause.clause;		
	}
	cmd += ' ORDER BY house.last_update DESC ';

	// set limit
	if (jsonParams.limit) {
		cmd += 'LIMIT ' + jsonParams.limit;
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
	function getWhereClause(jsonParams) {
		var params = [];
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
	var cmd = 'SELECT * FROM get_houses WHERE id=? LIMIT 1;';
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
	var cmd = 'UPDATE house SET price=?, bathrooms=?, bedrooms=?, size=?, user_id=?, address_id=?, house_type_id=?, house_status_id=?, currency_id=? WHERE id=?;';
	var params = [house.price, house.bathrooms, house.bedrooms, house.size, house.user_id, house.address_id, house.house_type_id, house.house_status_id, house.currency_id, id];
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
