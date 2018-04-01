let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;

describe('Houses Models Test', function () {
    let house = {
        id: null,
        price: 1000,
        rooms: 5,
        bathrooms: 1,
        bedrooms: 2,
        size: 40,
        user_id: 1,
        street_name: 'Model House',
        house_number: 1,
        postal_code_id: 12,
        city: 'Modelist',
        land: 'Mode Land',
        currency_id: 1,        
        house_type_id: 1,
        house_status_id: 1
    };
    let model = require('./house.model');
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
        model.getHouses(null, null, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done();
        });
    });
    it('should search the correct houses', function (done) {
        let query = {
            bedrooms: house.bedrooms,
            bathrooms: house.bathrooms
        };
        model.getHouses(null, query, function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            // first pick
            let firstResult = results[0];
            expect(firstResult).to.have.property('bathrooms').which.is.equal(house.bathrooms);
            expect(firstResult).to.have.property('bedrooms').which.is.equal(house.bedrooms);
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
    let house = {
        id: null,
        price: 1000,
        rooms: 5,
        bathrooms: 1,
        bedrooms: 2,
        size: 40,
        user_id: 1,
        street_name: 'Model House',
        house_number: 1,
        postal_code_id: 12,
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
    it('should get all houses of specific trait per GET on /api/houses', function (done) {
        let options = {
            rooms: 5,
            bathrooms: 1,
            bedrooms: 2
        }
        chai.request(app)
            .get('/api/houses')
            .end(function (error, results) {
                expect(results).to.have.status(200);
                expect(results.body).to.be.an('array');
                expect(results.body).to.have.length.greaterThan(0);
                let result = results.body[0];
                expect(result.rooms >= options.rooms).to.be.true;
                expect(result.bathrooms >= options.bathrooms).to.be.true;
                expect(result.bedrooms >= options.bedrooms).to.be.true;
                done();
            });
    });
    it('should get 5 houses per GET on /api/houses', function (done) {
        let count = 5;
        chai.request(app)
            .get('/api/houses?count=' + count)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                expect(result.body.length <= count).to.be.true;
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