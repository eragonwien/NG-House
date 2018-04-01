process.env.NODE_ENV = 'test';
// API Tests
let addressTest = require('./backend/components/address/address.test');  
let landTest = require('./backend/components/land/land.test');  
let cityTest = require('./backend/components/city/city.test');  
let postalCodeTest = require('./backend/components/postalCode/postal.code.test');  
let currencyTest = require('./backend/components/currency/currency.test');
let roleTest = require('./backend/components/role/role.test');
let userTest = require('./backend/components/user/user.test');
let houseTest = require('./backend/components/house/house.test');
let houseStatusTest = require('./backend/components/houseStatus/house.status.test');
let houseTypeTest = require('./backend/components/houseType/house.type.test');
let bookmarkTest = require('./backend/components/bookmark/bookmark.test');
let tagTest = require('./backend/components/tag/tag.test');

// Setup Test
let buildTest = require('./build/build.test'); 

// Mailer Test
//let mailerTest = require('./backend/components/mailer/mailer.test');