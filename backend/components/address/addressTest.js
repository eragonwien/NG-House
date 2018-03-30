let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('Address Model Test', function () {
    let address = {
        id: null,
        address: 'Neubaugasse ' + new Date().getTime(),
        postal_code: new Date().getTime().toString(),
        city: 'Vienna',
        land: 'Austria'
    }
    let model = require('./addressModel');
    it('should create a new address and return an id', function (done) {
        model.createNewAddress(address, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.have.property('insertId');
            address.id = result.insertId;
            done();
        })
    });
    it('should get all addresses', function (done) {
        model.getAllAddresses(function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
            done();
        })
    });
    it('should get address by id', function (done) {
        model.getAddressById(address.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('address').which.is.equal(address.address);
            expect(result).to.have.property('postal_code').which.is.equal(address.postal_code);
            expect(result).to.have.property('city').which.is.equal(address.city);
            expect(result).to.have.property('land').which.is.equal(address.land);
            done();
        })
    });
    it('should get id of an address', function (done) {
        model.getAddressIdByAddress(address, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('id').which.is.equal(address.id);
            done();
        })
    });
    it('should update an address', function (done) {
        address.address = 'Neubaugasse 84';
        address.city = 'Wien';
        model.updateAddressById(address.id, address, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            model.getAddressById(address.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.an('object');
                expect(result).to.have.property('address').which.is.equal(address.address);
                expect(result).to.have.property('postal_code').which.is.equal(address.postal_code);
                expect(result).to.have.property('city').which.is.equal(address.city);
                expect(result).to.have.property('land').which.is.equal(address.land);
                done();
            })
        })
    });
    it('should remove an address', function (done) {
        model.deleteAddressById(address.id, function (error, result) {
            if (error) {
                return done(error);
            }
            model.getAddressById(address.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.undefined;
                done();
            })
        })
    });
});

describe('Address request Test', function () {
    let address = {
        id: null,
        address: 'Neubaugasse ' + new Date().getTime(),
        postal_code: new Date().getTime().toString(),
        city: 'Vienna',
        land: 'Austria'
    };
    it('should create new address per POST on api/addresses', function (done) {
        chai.request(app)
            .post('/api/addresses')
            .send(address)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                address.id = result.body.insertId;
                done();
            });
    });
    it('should get all addresses per GET on api/addresses', function (done) {
        chai.request(app)
            .get('/api/addresses')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get address by id per GET on api/addresses/:id', function (done) {
        chai.request(app)
            .get('/api/addresses/' + address.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('address').which.is.equal(address.address)
                expect(result.body).to.have.property('postal_code').which.is.equal(address.postal_code)
                expect(result.body).to.have.property('city').which.is.equal(address.city)
                expect(result.body).to.have.property('land').which.is.equal(address.land)
                done();
            });
    });
    it('should get address id per POST on api/addresses/id', function (done) {
        chai.request(app)
            .post('/api/addresses/id')
            .send(address)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('id').which.is.equal(address.id);
                done();
            });
    });
    it('should update address per PUT on api/addresses/:id', function (done) {
        chai.request(app)
            .put('/api/addresses/' + address.id)
            .send(address)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                done();
            })
    });
    it('should delete address per DELETE on api/addresses/:id', function (done) {
        chai.request(app)
            .delete('/api/addresses/' + address.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                chai.request(app)
                    .get('/api/addresses/' + address.id)
                    .end(function (error, result) {
                        expect(result).to.have.status(200);
                        expect(result.body).to.be.empty;
                        done();
                    });
            });
    });
})