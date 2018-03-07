var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;

describe('Houses Models Test', function () {
    var house = {
        id: null,
        user_id: 1,
        address_id: 1,
        house_type_id: 1,
        bathrooms: 1,
        bedrooms: 2,
        size: 40
    }
    var model = require('./houseModels');
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
})