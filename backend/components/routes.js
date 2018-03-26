var express = require('express');
var router = express.Router();

// Controllers
var house = require('./house/houseController');
var user = require('./user/userController');
var address = require('./address/addressController');
var currency = require('./currency/currencyController');
var role = require('./role/roleController');
var houseType = require('./houseType/houseTypeController');
var houseStatus = require('./houseStatus/houseStatusController');
var mailer = require('./mailer/mailerController');

var checkUser = user.checkUser;
var checkAdmin = user.checkAdmin;
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
router.put('/api/users/:uid',checkUser, user.updateUserbyId);
router.delete('/api/users/:uid',checkUser, user.deleteUserById);

// Address
router.post('/api/addresses',checkUser, address.createAddress);
router.get('/api/addresses',checkUser, address.getAllAddresses);
router.get('/api/addresses/:aid',checkUser, address.getAddressById);
router.post('/api/addresses/id',checkUser, address.getAddressIdByAddress);
router.put('/api/addresses/:aid',checkUser, address.updateAddressById);
router.delete('/api/addresses/:aid',checkUser, address.deleteAddressById);

// Currency
router.post('/api/currencies',checkUser, currency.createCurrency);
router.get('/api/currencies',checkUser, currency.getAllCurrencies);
router.get('/api/currencies/:cid',checkUser, currency.getCurrencyById);
router.put('/api/currencies/:cid',checkUser, currency.updateCurrency);
router.delete('/api/currencies/:cid',checkUser, currency.deleteCurrency);

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
router.post('/api/houseTypes',checkUser, houseType.createHouseType);
router.get('/api/houseTypes',checkUser, houseType.getAllHouseType);
router.get('/api/houseTypes/:htid',checkUser, houseType.getHouseTypeById);
router.put('/api/houseTypes/:htid',checkUser, houseType.updateHouseTypeById);
router.delete('/api/houseTypes/:htid',checkUser, houseType.deleteHouseTypeById);

// House Status
router.post('/api/houseStatuses',checkUser, houseStatus.createHouseStatus);
router.get('/api/houseStatuses',checkUser, houseStatus.getAllHouseStatuses);
router.get('/api/houseStatuses/:hsid',checkUser, houseStatus.getHouseStatusById);
router.put('/api/houseStatuses/:hsid',checkUser, houseStatus.updateHouseStatusById);
router.delete('/api/houseStatuses/:hsid',checkUser, houseStatus.deleteHouseStatusById);

// Mailer
router.post('/mailer',checkUser, mailer.sendMail);

module.exports = router;
