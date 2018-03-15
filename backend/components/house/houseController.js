var model = require('./houseModels');

exports.createHouse = function (req, res, next) {
	model.createHouse(req.body, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
};

exports.getAllHouses = function (req, res, next) {
	model.getAllHouses(function (error, results) {
		if (error) {
			return next(error);
		}
		res.status(200).json(results);
	});
};

exports.getHouseById = function (req, res, next) {
	model.getHouseById(req.params.hid, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
};

exports.updateHouseById = function (req, res, next) {
	model.updateHouseById(req.params.hid, req.body, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
};

exports.deleteHouseById = function (req, res, next) {
	model.deleteHouseById(req.params.hid, function (error, result) {
		if (error) {
			return next(error);
		}
		res.status(200).json(result);
	});
};