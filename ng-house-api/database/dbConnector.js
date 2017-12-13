var mysql = require('mysql');
var dbConfig = require('./dbConfig');
var pool  = mysql.createPool({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.password,
  database : dbConfig.dbname_test,
  connectionLimit: 10
});

exports.pool = pool;

exports.query = function (cmd, params, callback){
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

exports.closePool = function() {
	pool.end(function(){
		console.log('Pool closed');
	});
}