process.env.NODE_ENV = 'test';
// API Tests
var addressTest = require('./backend/components/address/addressTest');  
var currencyTest = require('./backend/components/currency/currencyTest');
var roleTest = require('./backend/components/role/roleTest');
var userTest = require('./backend/components/user/userTest');
var houseTest = require('./backend/components/house/houseTest');
var houseTest = require('./backend/components/houseStatus/houseStatusTest');

// Setup Test
var buildTest = require('./build/buildTest');