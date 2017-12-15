var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (true) {
		res.render('index', {title: 'NG-House'});
	}
	else {
		res.redirect('/ng-house');
	}
  
});

module.exports = router;
