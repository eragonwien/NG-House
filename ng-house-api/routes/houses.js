var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbCheck = require('../database/dbCheck');
var db = require('../database/db');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var cmd = "SHOW TABLES;";
	db.query(cmd, null, function(error, results, fields){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(results);
	});
});

module.exports = router;
