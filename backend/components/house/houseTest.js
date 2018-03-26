var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../app');
var should = chai.should;
var expect = chai.expect;

describe('Houses Models Test', function () {
    var house = {
        id: null,
        price: 1000,
        rooms: 5,
        bathrooms: 1,
        bedrooms: 2,
        size: 40,
        user_id: 1,
        address: 'Model House 1',
        postal_code: '1234',
        city: 'Modelist',
        land: 'Mode Land',
        currency_id: 1,        
        house_type_id: 1,
        house_status_id: 1
    };
    var model = require('./houseModel');
    it('should create a house', function (done) {
        model.createHouse(house, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).be.an('object');
            expect(result).to.have.property('insertId');
            house.id = result.insertId;
            done();
        });
    });
    it('should list all houses', function (done) {
        model.getAllHouses(function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done();
        });
    });
    it('should get the created house', function (done) {
        model.getHouseById(house.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('user_id').which.is.equal(house.user_id);
            expect(result).to.have.property('address_id').which.is.equal(house.address_id);
            expect(result).to.have.property('house_type_id').which.is.equal(house.house_type_id);
            expect(result).to.have.property('house_status_id').which.is.equal(house.house_status_id);
            expect(result).to.have.property('price').which.is.equal(house.price);
            expect(result).to.have.property('bathrooms').which.is.equal(house.bathrooms);
            expect(result).to.have.property('bedrooms').which.is.equal(house.bedrooms);
            expect(result).to.have.property('size').which.is.equal(house.size);
            done();
        });
    });
    it('should update the created house', function (done) {
        house.house_type_id = 2;
        model.updateHouseById(house.id, house, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    });
    it('should delete the created house', function (done) {
        model.deleteHouseById(house.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    });
});

describe('House Request Test', function () {
    var house = {
        id: null,
        price: 1000,
        rooms: 5,
        bathrooms: 1,
        bedrooms: 2,
        size: 40,
        user_id: 1,
        address: 'Model House 1',
        postal_code: '1234',
        city: 'Modelist',
        land: 'Mode Land',
        currency_id: 1,        
        house_type_id: 1,
        house_status_id: 1
    };

    it('should create a house per POST on /api/houses', function (done) {
        chai.request(app)
            .post('/api/houses')
            .send(house)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                house.id = result.body.insertId;
                done();
            });
    });
    it('should get all houses per GET on /api/houses', function (done) {
        chai.request(app)
            .get('/api/houses')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get 5 houses per GET on /api/houses', function (done) {
        var limit = 5;
        chai.request(app)
            .get('/api/houses?limit=' + limit)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                expect(result.body.length <= limit).to.be.true;
                done();
            });
    });
    it('should get a house by id per GET on /api/houses/:hid', function (done) {
        chai.request(app)
            .get('/api/houses/' + house.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('user_id').which.is.equal(house.user_id);
                expect(result.body).to.have.property('house_type_id').which.is.equal(house.house_type_id);
                expect(result.body).to.have.property('house_status_id').which.is.equal(house.house_status_id);
                expect(result.body).to.have.property('price').which.is.equal(house.price);
                expect(result.body).to.have.property('bathrooms').which.is.equal(house.bathrooms);
                expect(result.body).to.have.property('bedrooms').which.is.equal(house.bedrooms);
                expect(result.body).to.have.property('size').which.is.equal(house.size);
                done();
            });
    });
    it('should update a house per PUT on /api/houses/:hid', function (done) {
        chai.request(app)
            .put('/api/houses/' + house.id)
            .send(house)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('should delete a house per DELETE on /api/houses/:hid', function (done) {
        chai.request(app)
            .delete('/api/houses/' + house.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
});