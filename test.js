process.env.NODE_ENV = 'test';
// API Tests
var addressTest = require('./backend/components/address/addressTest');  
var currencyTest = require('./backend/components/currency/currencyTest');
var roleTest = require('./backend/components/role/roleTest');
var userTest = require('./backend/components/user/userTest');
var houseTest = require('./backend/components/house/houseTest');
var houseStatusTest = require('./backend/components/houseStatus/houseStatusTest');
var bookmarkTest = require('./backend/components/bookmark/bookmarkTest');
var tagTest = require('./backend/components/tag/tagTest');

// Setup Test
var buildTest = require('./build/buildTest');

// Mailer Test
//var mailerTest = require('./backend/components/mailer/mailerTest');