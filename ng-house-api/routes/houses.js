var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbCheck = require('../database/dbCheck');
var db = require('../database/db');
var dbConfig = require('../database/dbConfig');
var dbname = dbConfig.dbname_test;


/* GET all houses */
router.get('/', function(req, res, next) {
	res.render('houses');
});

router.get('/houses', function(req, res, next) {
	var cmd = "SELECT * FROM Houses;";
	db.query(cmd, [dbname], function(error, results, fields){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(results);
	});
});

router.get('/houses/:id', function(req, res, next) {
	var cmd = "SELECT * FROM Houses WHERE ID=?;";
	db.query(cmd, [dbname, req.params.id], function(error, results, fields){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(results);
	});
});

router.get('/insert', function(req, res, next) {
	var cmd = "INSERT INTO Houses (Price, Type, Address, Bathrooms, Bedrooms, Area) VALUES (?, ?, ?, ?, ?, ?);";
	db.query(cmd, [1000, 'Villa', 'Sesam Street 12', 1, 1, 20], function(error, results, fields){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.redirect('/ng-house');
	});
}); 

module.exports = router;
