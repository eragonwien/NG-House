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
router.post('/api/users', user.createUser);
router.get('/api/users',checkAdmin, user.getAllUsers);
router.get('/api/users/:uid',checkUser, user.getUserById);
router.put('/api/users/:uid',checkUser, user.updateUserById);
router.delete('/api/users/:uid',checkUser, user.deleteUserById);

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
router.post('/api/roles',checkUser, role.createRole);
router.get('/api/roles',checkUser, role.getAllRoles);
router.get('/api/roles/:rid',checkUser, role.getRoleById);
router.put('/api/roles/:rid',checkUser, role.updateRoleById);
router.delete('/api/roles/:rid',checkUser, role.deleteRoleById);

// House
router.post('/api/houses', house.createHouse);
router.get('/api/houses', house.getHouses);
router.get('/api/houses/:hid',checkUser, house.getHouseById);
router.put('/api/houses/:hid',checkUser, house.updateHouseById);
router.delete('/api/houses/:hid',checkUser, house.deleteHouseById);

// House Type
router.post('/api/houseTypes', checkAdmin, houseType.createHouseType);
router.get('/api/houseTypes', houseType.getAllHouseType);
router.get('/api/houseTypes/:htid',checkUser, houseType.getHouseTypeById);
router.put('/api/houseTypes/:htid',checkUser, houseType.updateHouseTypeById);
router.delete('/api/houseTypes/:htid',checkUser, houseType.deleteHouseTypeById);

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
router.post('/api/tags',checkUser, tag.createTag);
router.get('/api/tags', tag.getAllTags);
router.get('/api/tags/:tid',checkUser, tag.getTagById);
router.put('/api/tags/:tid',checkUser, tag.updateTagById);
router.delete('/api/tags/:tid',checkUser, tag.deleteTagById);

// Mailer
router.post('/mailer',checkUser, mailer.sendMail);

// Test
router.post('/test', checkAdmin, test.generateTest);

module.exports = router;
