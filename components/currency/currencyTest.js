var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('Currency Model Test', function () {
    var currency = {
        id: null,
        name: 'Vietnam Dong',
        short: 'VND'
    };
    var model = require('./currencyModel');
    it('should create a new currency', function (done) {
        model.createCurrency(currency, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            currency.id = result.insertId;
            done();
        })
    });
    it('should get all currencies', function (done) {
        model.getAllCurrencies(function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            done();
        })
    });
    it('should get the created currency', function (done) {
        model.getCurrencyById(currency.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(currency.name);
            expect(result).to.have.property('short').which.is.equal(currency.short);
            done();
        })
    });
    it('should update the currency', function (done) {
        model.updateCurrency(currency.id, currency, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            model.getCurrencyById(currency.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.an('object');
                expect(result).to.have.property('name').which.is.equal(currency.name);
                expect(result).to.have.property('short').which.is.equal(currency.short);
                done();
            })
        })
    });
    it('delete the created currency', function (done) {
        model.deleteCurrencyById(currency.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            model.getCurrencyById(currency.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.undefined;
                done();
            })
        })
    });
});

describe('Currency Request Test', function () {
    var currency = {
        id: null,
        name: 'Vietnam Dong',
        short: 'VND'
    };
    it('should create a new currency per POST on /api/currencies', function (done) {
        chai.request(app)
            .post('/api/currencies')
            .send(currency)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.have.property('insertId');
                currency.id = result.body.insertId;
                done();
            })
    });
    it('should get all currencies per GET on /api/currencies', function (done) {
        chai.request(app)
            .get('/api/currencies')
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            })
    });
    it('should get the created currency per GET on /api/currencies/:cid', function (done) {
        chai.request(app)
            .get('/api/currencies/' + currency.id)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('name').which.is.equal(currency.name);
                expect(result.body).to.have.property('short').which.is.equal(currency.short);
                done();
            })
    });
    it('should update the currency per PUT on /api/currencies/:cid', function (done) {
        chai.request(app)
            .put('/api/currencies/' + currency.id)
            .send(currency)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                chai.request(app)
                    .get('/api/currencies/' + currency.id)
                    .end(function (error, result) {
                        expect(error).to.be.null;
                        expect(result).to.have.status(200);
                        expect(result.body).to.be.an('object');
                        expect(result.body).to.have.property('name').which.is.equal(currency.name);
                        expect(result.body).to.have.property('short').which.is.equal(currency.short);
                        done();
                    })
            })
    });
    it('delete the created currency per DELETE on /api/currencies/:cid', function (done) {
        chai.request(app)
            .get('/api/currencies/' + currency.id)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('name').which.is.equal(currency.name);
                expect(result.body).to.have.property('short').which.is.equal(currency.short);
                done();
            })
    }); 
});