var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.redirect('/ng-house');
});

module.exports = router;
