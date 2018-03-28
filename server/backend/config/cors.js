var debug = require('debug')('cors');
var origins = [
    'http://127.0.0.1:8887', 'http://localhost:8887',
    'http://127.0.0.1:3000', 'http://localhost:3000'
]

exports.origin = function (origin, done) {
    if (!origin) {
        return done(null, true);
    }
    if (origins.indexOf(origin) === -1) {
        debug(origin + ' declined');
        
        return done(new Error('origin not allowed'), false);
    }
    debug(origin + ' accepted');
    done(null, true);
}