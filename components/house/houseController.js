var models = require('./houseModels');

exports.showStartPage = function(req, res, next) {
	res.render('houses');
}

exports.getAllHouses = function(req, res, next) {
	models.getAllHouses(function(error, results){
		if (error) {
			return next(error);
		}
		res.json(results);
	});
}