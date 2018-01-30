var db = require('../database/pool');
var dbConfig = require('../database/dbConfig');
var pool = db.pool_test;
var numberOfFakeData = dbConfig.DB_NUM_OF_FAKE_DATA;

var pricemin = 1000, pricemax = 10000;
var bedmax = 5, bathmax = 5, areamin = 10, areamax = 1000;
var addresses = ["Treehouse", "Habour", "Boat", "Plane", "Desert", "Corner", "Tardis", "Spaceship"];
var types = ["Tent", "House", "Villa"];

insertRandomHouse(numberOfFakeData, insertRandomHouse);

function insertRandomHouse(count, done) {
	if (count < 1) {
		db.closePool(pool);
		console.log("INSERTION COMPLETED.");
		return;
	}
	var cmd = "INSERT INTO Houses SET ?;";
	pool.query(cmd, getRandomHouseInsert(), function(err) {
		if (err) {
			console.log(err);
			done(0, insertRandomHouse);
		}
		else {
			done(--count, insertRandomHouse);
		}
	});
}

function getRandomHouseInsert() {
	var price = getRandomNumber(pricemin, pricemax);
	var type = types[getRandomNumber(0, types.length)];
	var address = addresses[getRandomNumber(0, addresses.length)] + " " + getRandomNumber(1, 100);
	var description = type + " on " + address;
	var bed = getRandomNumber(0, bedmax);
	var bath = getRandomNumber(0, bathmax);
	var area = getRandomNumber(0, areamax);

	return  {Price: price, Type: type, Address: address, Description: description, Bedrooms: bed, Bathrooms: bath, Area: area};
}

function getRandomNumber(min, max) {
	return Math.floor((Math.random() * max) + min);;
}