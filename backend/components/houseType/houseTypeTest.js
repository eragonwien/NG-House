var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('House Type Model Test', function () {
    var houseType = {
        id: null,
        name: 'test type'
    }
    var model = require('./houseTypeModel');
    it('should create a house type', function (done) {
        model.createHouseType(houseType, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            houseType.id = result.insertId;
            done(); 
        });
    });
    it('should get all house types', function (done) {
        model.getAllHouseType(function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done(); 
        });
    });
    it('should get a house type by id', function (done) {
        model.getHouseTypeById(houseType.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(houseType.name);
            done(); 
        });
    });
    it('should update a house type', function (done) {
        model.updateHouseTypeById(houseType.id, houseType, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
    it('should delete a house type', function (done) {
        model.deleteHouseTypeById(houseType.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
});

describe('House Type Request Test', function () {
    var houseType = {
        id: null,
        name: 'test type'
    }
    it('should create a house type per POST on /api/houseTypes', function (done) {
        chai.request(app)
            .post('/api/houseTypes')
            .send(houseType)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                houseType.id = result.body.insertId;
                done();
            });
    });
    it('should get all house types per GET on /api/houseTypes', function (done) {
        chai.request(app)
            .get('/api/houseTypes')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get a house type by id per GET on /api/houseTypes/:htid', function (done) {
        chai.request(app)
            .get('/api/houseTypes/' + houseType.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('name').which.is.equal(houseType.name);
                done();
            });
    });
    it('should update a house type per PUT on /api/houseTypes/:htid', function (done) {
        chai.request(app)
            .put('/api/houseTypes/' + houseType.id)
            .send(houseType)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('should delete a house type per DELETE on /api/houseTypes/:htid', function (done) {
        chai.request(app)
            .delete('/api/houseTypes/' + houseType.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
});