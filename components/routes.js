var express = require('express');
var router = express.Router();

// Controllers
var house = require('./house/houseController');
var user = require('./user/userController');
var address = require('./address/addressController');
var currency = require('./currency/currencyController');
var role = require('./role/roleController');
var houseType = require('./houseType/houseTypeController');
var offerStatus = require('./offerStatus/offerStatusController');
var offer = require('./offer/offerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index');
});

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

// House Type
router.post('/api/houseTypes', houseType.createHouseType);
router.get('/api/houseTypes', houseType.getAllHouseType);
router.get('/api/houseTypes/:htid', houseType.getHouseTypeById);
router.put('/api/houseTypes/:htid', houseType.updateHouseTypeById);
router.delete('/api/houseTypes/:htid', houseType.deleteHouseTypeById);

// Offer Status
router.post('/api/offerStatuses', offerStatus.createOfferStatus);
router.get('/api/offerStatuses', offerStatus.getAllOfferStatuses);
router.get('/api/offerStatuses/:osid', offerStatus.getOfferStatusById);
router.put('/api/offerStatuses/:osid', offerStatus.updateStatusById);
router.delete('/api/offerStatuses/:osid', offerStatus.deleteStatusById);

// Offer
router.post('/api/offers', offer.createOffer);
router.get('/api/offers', offer.getAllOffer);
router.get('/api/offers/:oid', offer.getOfferById);
router.put('/api/offers/:oid', offer.updateOfferById);
router.delete('/api/offers/:oid', offer.deleteOfferById);


module.exports = router;
