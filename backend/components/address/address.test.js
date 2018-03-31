let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('Address Model Test', function () {
    let address = {
        id: null,
        street_name: 'Neubaugasse',
        house_number: 66,
        postal_code_id: 2,
        postal_code_code: null,
        city_name: null,
        land_name: null,
    };

    let model = require('./address.model');
    it('should create a new address and return an id', function (done) {
        model.createNewAddress(address, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.have.property('insertId');
            address.id = result.insertId;
            done();
        });
    });
    it('should get all addresses', function (done) {
        model.getAddresses(null, function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
            done();
        });
    });
    it('should get address by id', function (done) {
        model.getAddressById(address.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('street_name').which.is.equal(address.street_name);
            expect(result).to.have.property('house_number').which.is.equal(address.house_number);
            expect(result).to.have.property('postal_code_id').which.is.equal(address.postal_code_id);
            expect(result).to.have.property('postal_code_code');
            expect(result).to.have.property('city_name');
            expect(result).to.have.property('land_name');
            address.postal_code_code = result.postal_code_code;
            address.city_name = result.city_name;
            address.land_name = result.land_name;
            done();
        });
    });
    it('should get id of an address', function (done) {
        model.getAddressIdByAddress(address, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('id').which.is.equal(address.id);
            done();
        });
    });
    it('should update an address', function (done) {
        address.street_name = 'Neubaugasse';
        address.house_number = 67;
        model.updateAddressById(address.id, address, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
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
            });
        });
    });
});

describe('Address request Test', function () {
    let address = {
        id: null,
        street_name: 'Neubaugasse',
        house_number: 66,
        postal_code_id: 2,
        postal_code_code: null,
        city_name: null,
        land_name: null,
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
    it('should get address by id per GET on api/addresses/:aid', function (done) {
        chai.request(app)
            .get('/api/addresses/' + address.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('street_name').which.is.equal(address.street_name);
                expect(result.body).to.have.property('house_number').which.is.equal(address.house_number);
                expect(result.body).to.have.property('postal_code_id').which.is.equal(address.postal_code_id);
                done();
            });
    });
    it('should update address per PUT on api/addresses/:aid', function (done) {
        chai.request(app)
            .put('/api/addresses/' + address.id)
            .send(address)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);            
                done();
            });
    });
    it('should delete address per DELETE on api/addresses/:aid', function (done) {
        chai.request(app)
            .delete('/api/addresses/' + address.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
})