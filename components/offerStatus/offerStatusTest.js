var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('Offer Status Model Test', function () {
    var offerStatus = {
        id: null,
        name: 'test'
    }
    var model = require('./offerStatusModel');
    it('should create a offer status', function (done) {
        model.createOfferStatus(offerStatus, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            offerStatus.id = result.insertId;
            done(); 
        });
    });
    it('should get all offer statuses', function (done) {
        model.getAllOfferStatuses(function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done(); 
        });
    });
    it('should get a offer status by id', function (done) {
        model.getOfferStatusById(offerStatus.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(offerStatus.name);
            done(); 
        });
    });
    it('should update a offer status', function (done) {
        model.updateOfferStatusById(offerStatus.id, offerStatus, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
    it('should delete a offer status', function (done) {
        model.deleteOfferStatusById(offerStatus.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
});

describe('Offer Status Request Test', function () {
    var offerStatus = {
        id: null,
        name: 'test'
    }
    it('should create a offer status per POST on /api/offerStatuses', function (done) {
        chai.request(app)
            .post('/api/offerStatuses')
            .send(offerStatus)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                offerStatus.id = result.body.insertId;
                done();
            });
    });
    it('should get all offer statuses per GET on /api/offerStatuses', function (done) {
        chai.request(app)
            .get('/api/offerStatuses')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get a offer status by id per GET on /api/offerStatuses/:osid', function (done) {
        chai.request(app)
            .get('/api/offerStatuses/' + offerStatus.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('name').which.is.equal(offerStatus.name);
                done();
            });
    });
    it('should update a offer status per PUT on /api/offerStatuses/:osid', function (done) {
        chai.request(app)
            .put('/api/offerStatuses/' + offerStatus.id)
            .send(offerStatus)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('should delete a offer status per DELETE on /api/offerStatuses/:osid', function (done) {
        chai.request(app)
            .delete('/api/offerStatuses/' + offerStatus.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
});