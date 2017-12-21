var mysql = require('mysql');
var dbconfig = require('./dbConfig');
exports.pool_test = mysql.createPool({
  host     : dbconfig.DB_HOST,
  user     : dbconfig.DB_USER,
  password : dbconfig.DB_PASSWORD,
  database : dbconfig.DB_TEST,
  connectionLimit: dbconfig.DB_POOL_LIMIT,
  multipleStatements: true
});

exports.pool_production = mysql.createPool({
  host     : dbconfig.DB_HOST,
  user     : dbconfig.DB_USER,
  password : dbconfig.DB_PASSWORD,
  database : dbconfig.DB_PRODUCTION,
  connectionLimit: dbconfig.DB_POOL_LIMIT,
  multipleStatements: true
});

exports.pool_no_database = mysql.createPool({
  host     : dbconfig.DB_HOST,
  user     : dbconfig.DB_USER,
  password : dbconfig.DB_PASSWORD,
  connectionLimit: dbconfig.DB_POOL_LIMIT,
  multipleStatements: true
});

exports.closePool = function(pool) {
	pool.end(function(){
		//console.log('Pool closed');
	});
}