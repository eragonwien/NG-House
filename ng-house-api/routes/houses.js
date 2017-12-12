var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbCheck = require('../database/dbCheck');
var db = require('../database/db');


/* GET users listing. */
router.get('/', function(req, res, next) {

	res.send(db.donothing());
});

module.exports = router;
