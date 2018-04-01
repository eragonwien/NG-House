let pool = require('../../config/db').pool;
let addressModel = require('../address/address.model');
let debug = require('debug')('house_model');

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
		street_name: house.street_name,
		house_number: house.house_number,
		postal_code_id: house.postal_code_id,
	};
	addressModel.createNewAddress(address, function (error, result) {
		if (error) {
			return done(error);
		}
		house.address_id = result.insertId;
		insertHouse(house, done);
	});
}

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
}

/**
 * get houses based on paramters
 * @param {number} count query limit
 * @param {object} params parameter of query string
 * @param {function} done callback function
 */
function getHouses(count, queries, done) {
	let cmd = 'SELECT * FROM get_houses ';
	// create where clauses
	let whereClause = getWhereClause(queries);
	if (whereClause.clause) {
		cmd += whereClause.clause;		
	}
	cmd += ' ORDER BY last_update DESC, id ASC ';

	// set limit
	count = count ? count : 1000;
	cmd += 'LIMIT ' + count;

	let query = pool.query(cmd, whereClause.params, function(error, results){
		if (error) {
			debug(error);
			return done(error);
		}
		done(null, results);
	});
	debug(query.sql);
	

	/**
	 * use parameters to create a where clause string
	 * @param {string} params parameters as json string
	 * @returns {object} object contains string and params
	 */
	function getWhereClause(params) {
		let result = {
			clause: null,
			params: null
		};
		if (!params) {
			return result;
		}
		let clauses = [];
		let clausesParams = [];
		let str = "";
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
		if (clausesParams.length > 0) {
			str = "WHERE " + str;
		}
		result.clause = str;
		result.params = clausesParams;
		return result;
	}
}

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
}

/**
 * update house by id
 * @param {number} id id of the house
 * @param {object} house the updated house object
 * @param {function} done call back function
 */
function updateHouseById(id, house, done) {
	// get address id
	let address = {
		street_name: house.street_name,
		house_number: house.house_number,
		postal_code_id: house.postal_code_id,
	};
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
}

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
}

module.exports = {createHouse, getHouses, getHouseById, updateHouseById, deleteHouseById};