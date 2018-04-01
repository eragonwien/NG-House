let model = require('./house.model');

/**
 * middleware for creating house
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function create (req, res, next) {
	model.createHouse(req.body, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
}

/**
 * middleware for getting house
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function get (req, res, next) {
	if (req.params.hid) {
		model.getHouseById(req.params.hid, function (error, result) {
			if (error) {
				return next(error);
			}
			res.status(200).json(result);
		});
	} else {
		model.getHouses(req.query.count, req.query, function (error, results) {
			if (error) {
				return next(error);
			}
			res.status(200).json(results);
		});
	}
}

/**
 * middleware for searching house
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function search (req, res, next) {
	model.searchHouses(req.query, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
}

/**
 * middleware for updating house
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function update (req, res, next) {
	model.updateHouseById(req.params.hid, req.body, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
}

/**
 * middleware for removing house
 * @param {object} req express request object
 * @param {object} res express request object
 * @param {function} next middleware function
 */
function remove (req, res, next) {
	model.deleteHouseById(req.params.hid, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
}

module.exports = {create, get, update, remove};