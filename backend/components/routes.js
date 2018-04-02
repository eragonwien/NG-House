'use strict';

let express = require('express');
let router = express.Router();

// Controllers
let house = require('./house/house.controller');
let user = require('./user/user.controller');
let address = require('./address/address.controller');
let land = require('./land/land.controller');
let city = require('./city/city.controller');
let postalCode = require('./postalCode/postal.code.controller');
let currency = require('./currency/currency.controller');
let role = require('./role/role.controller');
let houseType = require('./houseType/house.type.controller');
let houseTag = require('./houseTag/house.tag.controller');
let houseStatus = require('./houseStatus/house.status.controller');
let bookmark = require('./bookmark/bookmark.controller');
let tag = require('./tag/tag.controller');
let mailer = require('./mailer/mailer.controller');
let test = require('./testGenerator/test.generator.controller');


let checkUser = user.checkUser;
let checkAdmin = user.checkAdmin;
// Authentication & Redirection
router.get('/', function (req, res, next) {
    res.render('index');
});
router.post('/login', user.authenticate);
router.get('/logout', user.logout);

// User
router.post('/api/users', user.create);
router.get('/api/users',checkAdmin, user.get);
router.get('/api/users/:uid',checkUser, user.get);
router.put('/api/users/:uid',checkUser, user.update);
router.delete('/api/users/:uid',checkUser, user.remove);

router.get('/api/users/:uid/bookmarks',checkUser, bookmark.get);

// Address
router.post('/api/addresses',checkUser, address.create);
router.get('/api/addresses', address.get);
router.get('/api/addresses/:aid',checkUser, address.get);
router.put('/api/addresses/:aid',checkUser, address.update);
router.delete('/api/addresses/:aid',checkUser, address.remove);

// Land
router.post('/api/lands',checkUser, land.create);
router.get('/api/lands', land.get);
router.get('/api/lands/:lid', land.get);
router.put('/api/lands/:lid',checkUser, land.update);
router.delete('/api/lands/:lid',checkUser, land.remove);

// City
router.post('/api/cities',checkUser, city.create);
router.get('/api/cities', city.get);
router.get('/api/cities/:ctid', city.get);
router.put('/api/cities/:ctid',checkUser, city.update);
router.delete('/api/cities/:ctid',checkUser, city.remove);

// Postal Code
router.post('/api/postalCodes',checkUser, postalCode.create);
router.get('/api/postalCodes', postalCode.get);
router.get('/api/postalCodes/:pcid', postalCode.get);
router.put('/api/postalCodes/:pcid',checkUser, postalCode.update);
router.delete('/api/postalCodes/:pcid',checkUser, postalCode.remove);

// Currency
router.post('/api/currencies',checkUser, currency.create);
router.get('/api/currencies', currency.get);
router.get('/api/currencies/:cid',checkUser, currency.get);
router.put('/api/currencies/:cid',checkUser, currency.update);
router.delete('/api/currencies/:cid',checkUser, currency.remove);

// Role
router.post('/api/roles',checkUser, role.create);
router.get('/api/roles',checkUser, role.get);
router.get('/api/roles/:rid',checkUser, role.get);
router.put('/api/roles/:rid',checkUser, role.update);
router.delete('/api/roles/:rid',checkUser, role.remove);

// House
router.post('/api/houses', house.create);
router.get('/api/houses', house.get);
router.get('/api/houses/:hid',checkUser, house.get);
router.put('/api/houses/:hid',checkUser, house.update);
router.delete('/api/houses/:hid',checkUser, house.remove);

// House Type
router.post('/api/houseTypes', checkAdmin, houseType.create);
router.get('/api/houseTypes', houseType.get);
router.get('/api/houseTypes/:htid',checkUser, houseType.get);
router.put('/api/houseTypes/:htid',checkUser, houseType.update);
router.delete('/api/houseTypes/:htid',checkUser, houseType.remove);

// House Tag
router.post('/api/houseTags', checkAdmin, houseTag.create);
router.get('/api/houseTags', houseTag.get);
router.get('/api/houseTags/:htid',checkUser, houseTag.get);
router.put('/api/houseTags/:htid',checkUser, houseTag.update);
router.delete('/api/houseTags/:htid',checkUser, houseTag.remove);

// House Status
router.post('/api/houseStatuses',checkUser, houseStatus.create);
router.get('/api/houseStatuses', houseStatus.get);
router.get('/api/houseStatuses/:hsid',checkUser, houseStatus.get);
router.put('/api/houseStatuses/:hsid',checkUser, houseStatus.update);
router.delete('/api/houseStatuses/:hsid',checkUser, houseStatus.remove);

// Bookmark
router.post('/api/bookmarks',checkUser, bookmark.create);
router.get('/api/bookmarks', bookmark.get);
router.get('/api/bookmarks/:bmid',checkUser, bookmark.get);
router.put('/api/bookmarks/:bmid',checkUser, bookmark.update);
router.delete('/api/bookmarks/:bmid',checkUser, bookmark.remove);

// Tag
router.post('/api/tags',checkUser, tag.create);
router.get('/api/tags', tag.get);
router.get('/api/tags/:tid',checkUser, tag.get);
router.put('/api/tags/:tid',checkUser, tag.update);
router.delete('/api/tags/:tid',checkUser, tag.remove);

// Mailer
router.post('/mailer',checkUser, mailer.send);

// Test
router.post('/test', checkAdmin, test.generateTest);

module.exports = router;
