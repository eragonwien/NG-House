var db = require('../database/db');
var dbConfig = require('../database/dbConfig');
var pool = db.pool_test;
var numberOfFakeData = dbConfig.NUM_OF_FAKE_DATA;
checkTableExist();

function checkTableExist() {
	var cmd = "SELECT 1 FROM Houses LIMIT 1;";

	pool.query(cmd, null, function(err) {
		if (err) {
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
	var cmd = dbConfig.sql_create_table_house;

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
}

