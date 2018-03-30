let express = require('express');
let router = express.Router();

// Controllers
let house = require('./house/houseController');
let user = require('./user/userController');
let address = require('./address/addressController');
let currency = require('./currency/currencyController');
let role = require('./role/roleController');
let houseType = require('./houseType/houseTypeController');
let houseStatus = require('./houseStatus/houseStatusController');
let bookmark = require('./bookmark/bookmarkController');
let tag = require('./tag/tagController');
let mailer = require('./mailer/mailerController');
let test = require('./testGenerator/testGeneratorController');


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

router.get('/api/users/:uid/bookmarks',checkUser, bookmark.getBookmarksByUser);

// Address
router.post('/api/addresses',checkUser, address.createAddress);
router.get('/api/addresses', address.getAllAddresses);
router.get('/api/addresses/:aid',checkUser, address.getAddressById);
router.post('/api/addresses/id',checkUser, address.getAddressIdByAddress);
router.put('/api/addresses/:aid',checkUser, address.updateAddressById);
router.delete('/api/addresses/:aid',checkUser, address.deleteAddressById);

// Currency
router.post('/api/currencies',checkUser, currency.createCurrency);
router.get('/api/currencies', currency.getAllCurrencies);
router.get('/api/currencies/:cid',checkUser, currency.getCurrencyById);
router.put('/api/currencies/:cid',checkUser, currency.updateCurrencyById);
router.delete('/api/currencies/:cid',checkUser, currency.deleteCurrencyById);

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
router.post('/api/houseStatuses',checkUser, houseStatus.createHouseStatus);
router.get('/api/houseStatuses', houseStatus.getAllHouseStatuses);
router.get('/api/houseStatuses/:hsid',checkUser, houseStatus.getHouseStatusById);
router.put('/api/houseStatuses/:hsid',checkUser, houseStatus.updateHouseStatusById);
router.delete('/api/houseStatuses/:hsid',checkUser, houseStatus.deleteHouseStatusById);

// Bookmark
router.post('/api/bookmarks',checkUser, bookmark.createBookmark);
router.get('/api/bookmarks', bookmark.getAllBookmarks);
router.get('/api/bookmarks/:bmid',checkUser, bookmark.getBookmarkById);
router.put('/api/bookmarks/:bmid',checkUser, bookmark.updateBookmarkById);
router.delete('/api/bookmarks/:bmid',checkUser, bookmark.deleteBookmarkById);

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
