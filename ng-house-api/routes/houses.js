var express = require('express');
var router = express.Router();

var housesController = require('../controllers/housesController')
var mysql = require('mysql');
var dbConfig = require('../database/dbConfig');
var models = require('../models/houses');
var dbname = dbConfig.dbname_test;


// Render Start Page
router.get('/', housesController.showStartPage);

// GET all houses
router.get('/houses', function(req, res, next) {
	models.getAllHouses(function(error, results){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(results);
	});
});

// GET house by ID
router.get('/houses/:id', function(req, res, next) {
	models.getHouseById(req.params.id, function(error, result){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(result);
	});
});

// CREATE new house entry
router.post('/houses', function(req, res, next) {
	models.createNewHouse(req.body, function(error, result){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send(result);
	});
});

// UPDATE existing house entry by ID
router.put('/houses/:id', function(req, res, next) {
	models.updateHouseById(req.params.id, req.body, function(error, result){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send('house' + req.params.id + ' is updated');
	});
});

// DELETE existing house entry by ID
router.delete('/houses/:id', function(req, res, next) {
	models.deleteHouseById(req.params.id, function(error, result){
		if (error) {
			console.log(error);
			return next(error);
		}
		res.send('house' + req.params.id + ' is deleted');
	});
});

module.exports = router;
