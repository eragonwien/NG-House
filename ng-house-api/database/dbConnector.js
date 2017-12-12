var mysql = require('mysql');
var dbConfig = require('./dbConfig');
var pool  = mysql.createPool({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.password,
  database : dbConfig.dbname,
  connectionLimit: 10
});

exports.pool = pool;

exports.closePool = function() {
	pool.end(function(){
		console.log('Pool closed');
	});
}