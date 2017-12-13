var connector = require('./dbconnector');

var pool = connector.pool;

exports.query = function(cmd, params, callback){
	pool.getConnection(function(err, connection){
		if (err) {
			console.log(err);
			callback(true, null);
			return;
		}
		//console.log("connected");

		connection.query(cmd, params, function(error, results, fields){
			connection.release();

			if (error) {
				console.log(error);
				callback(true, null);
				return;
			}
			callback(false, results);
		});
	});
}

exports.donothing = function(){
	return "nothing";
}