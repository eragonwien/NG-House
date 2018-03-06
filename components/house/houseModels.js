var pool = require('../../config/db');

exports.getAllHouses = function(done) {
	var cmd = 'SELECT * FROM house';
	pool.query(cmd, null, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
}

