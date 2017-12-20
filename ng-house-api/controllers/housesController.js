var mysql = require('mysql');
var dbCheck = require('../models/dbCheck');
var dbConfig = require('../database/dbConfig');
var models = require('../models/houses');
var dbname = dbConfig.dbname_test;

exports.showStartPage = function(req, res, next) {
	res.render('houses');
}

exports.getAllHouses = function(req, res, next) {
	models.getAllHouses(function(error, results){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(results);
	});
}