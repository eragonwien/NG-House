var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('Offer Model Test', function () {
    var offer = {
        id: null,
        user_id: 1,
        house_id: 1,
        price: 2000,
        offer_status_id: 1,
        currency_id: 1
    }
    var model = require('./offerModel');
    it('should create a offer ', function (done) {
        model.createOffer(offer, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            offer.id = result.insertId;
            done(); 
        });
    });
    it('should get all offer s', function (done) {
        model.getAllOffer(function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done(); 
        });
    });
    it('should get a offer  by id', function (done) {
        model.getOfferById(offer.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('user_id').which.is.equal(offer.user_id);
            expect(result).to.have.property('house_id').which.is.equal(offer.house_id);
            expect(result).to.have.property('currency_id').which.is.equal(offer.currency_id);
            expect(result).to.have.property('price').which.is.equal(offer.price);
            expect(result).to.have.property('offer_status_id').which.is.equal(offer.offer_status_id);
            done(); 
        });
    });
    it('should update a offer ', function (done) {
        model.updateOfferById(offer.id, offer, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
    it('should delete a offer ', function (done) {
        model.deleteOfferById(offer.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
});

describe('Offer Request Test', function () {
    var offer = {
        id: null,
        user_id: 1,
        house_id: 1,
        price: 2000,
        offer_status_id: 1,
        currency_id: 1
    }
    it('should create a offer per POST on /api/offers', function (done) {
        chai.request(app)
            .post('/api/offers')
            .send(offer)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                offer.id = result.body.insertId;
                done();
            });
    });
    it('should get all offer per GET on /api/offers', function (done) {
        chai.request(app)
            .get('/api/offers')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get a offer by id per GET on /api/offers/:oid', function (done) {
        chai.request(app)
            .get('/api/offers/' + offer.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('user_id').which.is.equal(offer.user_id);
                expect(result.body).to.have.property('house_id').which.is.equal(offer.house_id);
                expect(result.body).to.have.property('currency_id').which.is.equal(offer.currency_id);
                expect(result.body).to.have.property('price').which.is.equal(offer.price);
                expect(result.body).to.have.property('offer_status_id').which.is.equal(offer.offer_status_id);
                done();
            });
    });
    it('should update a offer per PUT on /api/offers/:oid', function (done) {
        chai.request(app)
            .put('/api/offers/' + offer.id)
            .send(offer)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('should delete a offer per DELETE on /api/offers/:oid', function (done) {
        chai.request(app)
            .delete('/api/offers/' + offer.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
});