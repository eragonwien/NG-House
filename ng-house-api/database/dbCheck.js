var mysql = require('mysql');
var dbConfig = require('./dbConfig');
var pool  = mysql.createPool({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.password,
  connectionLimit : 10,
  multipleStatements : true
});

var dbname = dbConfig.dbname_test;
checkIfDatabaseExist(dbname);

function query(cmd, params, callback){
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

function checkIfDatabaseExist(dbname) {
	var cmd = "SHOW DATABASES LIKE ?";
	query(cmd, dbname, function(err, results) {
		if (err) {
			console.log("Error");
			closePool();
			return;
		}
		if (results !== null & results.length > 0) {
			console.log("DATABASE " + dbname + " exists.");
			closePool();
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
	query(cmd, dbname, function(err) {
		if (err) {
			console.log("Error");
			closePool();
			return;
		}
		else {
			console.log("DATABASE " + dbname + " CREATED");
			useDatabase(dbname);
		}
	});
}

function useDatabase(dbname) {
	var cmd = "USE " + dbname;
	query(cmd, dbname, function(err) {
		if (err) {
			console.log("Error");
			closePool();
			return;
		}
		else {
			console.log("USING " + dbname + ".");
			createTables();
		}
	});
}

function createTables() {
	var cmd = dbConfig.sql_create_table_details + dbConfig.sql_create_table_house;

	query(cmd, null, function(err) {
		if (err) {
			console.log("Error");
			return;
		}
		else {
			console.log("TABLES ARE CREATED");
		}
		closePool();
	});
}

function closePool() {
	pool.end(function() {
		//console.log("Pool ended");
	})
}


