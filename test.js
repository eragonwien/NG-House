process.env.NODE_ENV = 'test';
// API Tests
let addressTest = require('./backend/components/address/address.test');  
let landTest = require('./backend/components/land/land.test');  
let cityTest = require('./backend/components/city/city.test');  
let postalCodeTest = require('./backend/components/postalCode/postal.code.test');  
//let currencyTest = require('./backend/components/currency/currencyTest');
//let roleTest = require('./backend/components/role/roleTest');
//let userTest = require('./backend/components/user/userTest');
//let houseTest = require('./backend/components/house/houseTest');
//let houseStatusTest = require('./backend/components/houseStatus/houseStatusTest');
//let bookmarkTest = require('./backend/components/bookmark/bookmarkTest');
//let tagTest = require('./backend/components/tag/tagTest');

// Setup Test
//let buildTest = require('./build/buildTest'); 

// Mailer Test
//let mailerTest = require('./backend/components/mailer/mailerTest');