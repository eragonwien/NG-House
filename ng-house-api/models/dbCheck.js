var dbConfig = require('../database/dbConfig');
var db = require('../database/db');
var pool = db.pool_no_database;

var dbname = dbConfig.DB_TEST;
var numberOfFakeData = dbConfig.NUM_OF_FAKE_DATA
checkIfDatabaseExist(dbname);

function checkIfDatabaseExist(dbname) {
	var cmd = "SHOW DATABASES LIKE ?";
	pool.query(cmd, dbname, function(err, results) {
		if (err) {
			console.log(err);
			db.closePool(pool);
			return;
		}
		if (results !== null & results.length > 0) {
			console.log("DATABASE " + dbname + " exists.");
			db.closePool(pool);
			return;
		}
		else {
			console.log("DATABASE " + dbname + " does not exist.");
			createDatabase(dbname);
		}
	});
}

function createDatabase(dbname) {
	var cmd = "CREATE DATABASE " + dbname;
	pool.query(cmd, dbname, function(err) {
		if (err) {
			console.log(err);
			db.closePool(pool);
			return;
		}
		else {
			console.log("DATABASE " + dbname + " CREATED");
			db.closePool(pool);
		}
	});
}

