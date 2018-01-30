var db = require('../database/pool');
var dbconfig = require('../database/dbConfig');
var pool = db.pool_test;
var numberOfFakeData = dbconfig.DB_NUM_OF_FAKE_DATA;

checkTableExist();

function checkTableExist() {
	var cmd = "SELECT 1 FROM Houses LIMIT 1;";

	pool.query(cmd, null, function(err) {
		if (err) {
			console.log("TABLE Houses does not exist");
			createTables();
		}
		else {
			console.log("TABLE EXISTS");
			db.closePool(pool);
			return;
		}
	});
}

function createTables() {
	var readsql = readSQL('./database/sql/create_houses.sql', function (error, result) {
		if (error) {
			return;
		}

		var cmd = result;
		pool.query(cmd, null, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			else {
				console.log("TABLE ARE CREATED");
				var createFakeData = require('./createFakeData');
			}
		});
	});

	
}

function readSQL(absolutePath, done) {
	var fs = require('fs');
	return fs.readFile(absolutePath, function(error, content) {
		if (error) {
			console.log(error);
			done(true, null);
			return;
		}
		done(false, content.toString());
	});
}

