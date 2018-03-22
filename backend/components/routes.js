var express = require('express');
var router = express.Router();

// Controllers
var page = require('./general/pageController');
var house = require('./house/houseController');
var user = require('./user/userController');
var address = require('./address/addressController');
var currency = require('./currency/currencyController');
var role = require('./role/roleController');
var houseType = require('./houseType/houseTypeController');
var houseStatus = require('./houseStatus/houseStatusController');

// Authentication & Redirection
router.get('/', page.getIndex);
router.post('/login', page.authenticate);

// User
router.post('/api/users', user.createUser);
router.get('/api/users', user.getAllUsers);
router.get('/api/users/:uid', user.getUserById);
router.put('/api/users/:uid', user.updateUserbyId);
router.delete('/api/users/:uid', user.deleteUserById);

// Address
router.post('/api/addresses', address.createAddress);
router.get('/api/addresses', address.getAllAddresses);
router.get('/api/addresses/:aid', address.getAddressById);
router.post('/api/addresses/id', address.getAddressIdByAddress);
router.put('/api/addresses/:aid', address.updateAddressById);
router.delete('/api/addresses/:aid', address.deleteAddressById);

// Currency
router.post('/api/currencies', currency.createCurrency);
router.get('/api/currencies', currency.getAllCurrencies);
router.get('/api/currencies/:cid', currency.getCurrencyById);
router.put('/api/currencies/:cid', currency.updateCurrency);
router.delete('/api/currencies/:cid', currency.deleteCurrency);

// Role
router.post('/api/roles', role.createRole);
router.get('/api/roles', role.getAllRoles);
router.get('/api/roles/:rid', role.getRoleById);
router.put('/api/roles/:rid', role.updateRoleById);
router.delete('/api/roles/:rid', role.deleteRoleById);

// House
router.post('/api/houses', house.createHouse);
router.get('/api/houses', house.getHouses);
router.get('/api/houses/:hid', house.getHouseById);
router.put('/api/houses/:hid', house.updateHouseById);
router.delete('/api/houses/:hid', house.deleteHouseById);

// House Type
router.post('/api/houseTypes', houseType.createHouseType);
router.get('/api/houseTypes', houseType.getAllHouseType);
router.get('/api/houseTypes/:htid', houseType.getHouseTypeById);
router.put('/api/houseTypes/:htid', houseType.updateHouseTypeById);
router.delete('/api/houseTypes/:htid', houseType.deleteHouseTypeById);

// House Status
router.post('/api/houseStatuses', houseStatus.createHouseStatus);
router.get('/api/houseStatuses', houseStatus.getAllHouseStatuses);
router.get('/api/houseStatuses/:hsid', houseStatus.getHouseStatusById);
router.put('/api/houseStatuses/:hsid', houseStatus.updateHouseStatusById);
router.delete('/api/houseStatuses/:hsid', houseStatus.deleteHouseStatusById);

module.exports = router;
