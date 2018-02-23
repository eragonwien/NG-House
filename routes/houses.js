var express = require('express');
var router = express.Router();

var controller = require('../houses/housesController');

// Render Start Page
router.get('/', controller.showStartPage);

// GET all houses
router.get('/houses', controller.getAllHouses);

module.exports = router;
