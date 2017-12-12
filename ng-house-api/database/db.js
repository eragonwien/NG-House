var connector = require('./dbconnector');

var pool = connector.pool;


exports.donothing = function() {
	connector.closePool();
	return 'Pool closed';
}
