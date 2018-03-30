let pool = require('../../config/db').pool;
let addressModel = require('../address/addressModel');

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
	let address = {
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
	let cmd = 'INSERT INTO house(price, rooms, bathrooms, bedrooms, size, user_id, address_id, house_type_id, house_status_id, currency_id) VALUES(?,?,?,?,?,?,?,?,?,?);';
	let params = [house.price, house.rooms, house.bathrooms, house.bedrooms, house.size, house.user_id, house.address_id, house.house_type_id, house.house_status_id, house.currency_id];
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
	let cmd = 'SELECT * FROM get_houses;';
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
	let cmd = 'SELECT * FROM get_houses ';

	// create where clauses
	let whereClause = getWhereClause(params);
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
		let clauses = [];
		let clausesParams = [];
		let str = "WHERE ";
		if (params.user_id) {
			clauses.push('user_id=?');
			clausesParams.push(params.user_id);
		}
		if (params.city) {
			clauses.push('city=?');
			clausesParams.push(params.city);
		}
		if (params.land) {
			clauses.push('land=?');
			clausesParams.push(params.land);			
		}
		if (params.minSize) {
			clauses.push('size>=?');
			clausesParams.push(params.minSize);			
		}
		if (params.maxPrice) {
			clauses.push('price<=?');
			clausesParams.push(params.maxPrice);		
		}
		if (params.currency_id) {
			clauses.push('currency_id=?');
			clausesParams.push(params.currency_id);			
		}
		if (params.house_type_id) {
			clauses.push('house_type_id=?');
			clausesParams.push(params.house_type_id);			
		}
		if (params.rooms) {
			clauses.push('rooms >= ?');
			clausesParams.push(params.rooms);						
		}
		if (params.bathrooms) {
			clauses.push('bathrooms >= ?');
			clausesParams.push(params.bathrooms);						
		}
		if (params.bedrooms) {
			clauses.push('bedrooms >= ?');
			clausesParams.push(params.bedrooms);			
		}
		for (let i = 0; i < clauses.length; i++) {
			if (i > 0) {
				str += ' AND ';
			}
			str += clauses[i];
		}
		let result = {
			clause: str,
			params: clausesParams
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
	let cmd = 'SELECT * FROM get_houses WHERE id=? LIMIT 1;';
	let params = [id];
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
	// get address id
	let address = {
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
		let cmd = 'UPDATE house SET price=?, rooms=?, bathrooms=?, bedrooms=?, size=?, user_id=?, address_id=?, house_type_id=?, house_status_id=?, currency_id=? WHERE id=?;';
		let params = [house.price, house.rooms, house.bathrooms, house.bedrooms, house.size, house.user_id, house.address_id, house.house_type_id, house.house_status_id, house.currency_id, id];
		pool.query(cmd, params, function(error, result) {
			if (error) {
				return done(error);
			}
			done(null, result);
		});
	});
};
exports.updateHouseById = updateHouseById;

/**
 * delete house by id
 * @param {number} id id of the house
 * @param {function} done callback function
 */
function deleteHouseById(id, done) {
	let cmd = 'DELETE FROM house WHERE id=? LIMIT 1;';
	let params = [id];
	pool.query(cmd, params, function(error, result){
		if (error) {
			return done(error);
		}
		done(null, result);
	});
};
exports.deleteHouseById = deleteHouseById;
