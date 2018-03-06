var mysql = require('mysql');
exports.pool = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : (process.env.NODE_ENV == 'production') ? process.env.DB_PRODUCTION : process.env.DB_TEST,
  connectionLimit: process.env.DB_POOL_LIMIT,
  multipleStatements: true
});

exports.pool_no_database = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_POOL_LIMIT,
  multipleStatements: true
});

exports.closePool = function(pool) {
	pool.end(function(){
		//console.log('Pool closed');
	});
}