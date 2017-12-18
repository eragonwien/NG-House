var mysql = require('mysql');
var dbConfig = require('./dbConfig');
exports.pool_test = mysql.createPool({
  host     : dbConfig.HOST,
  user     : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB_TEST,
  connectionLimit: dbConfig.LIMIT
});

exports.pool_production = mysql.createPool({
  host     : dbConfig.HOST,
  user     : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB_PRODUCTION,
  connectionLimit: dbConfig.LIMIT
});

exports.pool_no_database = mysql.createPool({
  host     : dbConfig.HOST,
  user     : dbConfig.USER,
  password : dbConfig.PASSWORD,
  connectionLimit: dbConfig.LIMIT
});

exports.closePool = function() {
	pool.end(function(){
		console.log('Pool closed');
	});
}