'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('PostalCode Model Test', function () {
    let postal_code = {
        id: null,
        code: new Date().getTime().toString(),
        city_id: 1,
        land_id: 1        
    }

    let model = require('./postal.code.model');
    it('should create a new postal_code', function (done) {
        model.createPostalCode(postal_code, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            postal_code.id = result.insertId;
            done();
        });
    }); 
    it('should get all available postalCodes', function (done) {
        model.getPostalCodes(null, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            done();
        });
    }); 
    it('should get the created postal_code', function (done) {
        model.getPostalCodeById(postal_code.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('code').which.is.equal(postal_code.code);
            done();
        });
    }); 
    it('should update the created postal_code', function (done) {
        postal_code.name = 'PostalCodex';
        model.updatePostalCodeById(postal_code.id, postal_code, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    }); 
    
    it('should delete the created postal_code', function (done) {
        model.deletePostalCodeById(postal_code.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    }); 
});

describe('PostalCode Request Test', function () {
    let postal_code = {
        id: null,
        code: new Date().getTime().toString(),
        city_id: 1,
        land_id: 1  
    }
    it('should create a new postal_code per POST on /api/postalCodes', function (done) {
        chai.request(app)
            .post('/api/postalCodes')
            .send(postal_code)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                postal_code.id = result.body.insertId;
                done();
            });
    }); 
    it('should get all available postalCodes per GET on /api/postalCodes', function (done) {
        chai.request(app)
            .get('/api/postalCodes')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    }); 
    it('should get the created postal_code per GET on /api/postalCodes/:pcid', function (done) {
        chai.request(app)
            .get('/api/postalCodes/' + postal_code.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('code').which.is.equal(postal_code.code);
                done();
            });
    }); 
    it('should update the created postal_code per PUT on /api/postalCodes/:pcid', function (done) {
        postal_code.name = 'changed PostalCode';
        chai.request(app)
            .put('/api/postalCodes/' + postal_code.id)
            .send(postal_code)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    }); 
    it('should delete the created postal_code per DELETE on /api/postalCodes/:pcid', function (done) {
        chai.request(app)
            .delete('/api/postalCodes/' + postal_code.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    }); 
 });