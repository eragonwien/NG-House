var mysql = require('mysql');
var dbConfig = require('./dbConfig');
var pool  = mysql.createPool({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.password,
  connectionLimit: 10
});

var dbname = dbConfig.dbname;
checkdb(dbname);

function checkdb(dbname) {
	pool.getConnection(function(err, connection){
		if (err) {
			console.log(err);
			closePool();
			return;
		}
		//console.log("connected");

		var cmd = "SHOW DATABASES LIKE ?";
		connection.query(cmd, [dbname], function(err, results){
			connection.release();

			if (err) {
				console.log(err);
				closePool();
				return;
			}

			//console.log(results);
			
			if (results.length > 0) {
				console.log("DB " + dbname + " exists.");
				closePool();
				return;
			}

			createDB(dbname);
		});
	});
}

function createDB(dbname) {
	pool.getConnection(function(err, connection){
		if (err) {
			console.log(err);
		}
		//console.log("connected");

		var cmd = "CREATE DATABASE " + dbname;

		connection.query(cmd, dbname, function(err){
			connection.release();

			if (err) {
				console.log(err);
			}
			console.log("DB " + dbname + " created.")
			closePool();
		});
	});
}

function query(cmd, params, callback){
	pool.getConnection(function(err, connection){
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		//console.log("connected");

		connection.query(cmd, params, function(err){
			connection.release();

			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false);
		});
	});
}

function createdb(dbname) {
	var cmd = "CREATE DATABASE " + dbname;
	query(cmd, dbname, function(err) {
		if (err) {
			console.log("Error");
		}
		else {
			console.log("DATABASE " + dbname + "CREATED");
		}
		closePool();
	});
}


function closePool() {
	pool.end(function() {
		//console.log("Pool ended");
	})
}


