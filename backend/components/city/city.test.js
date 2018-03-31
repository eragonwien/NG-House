'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('City Model Test', function () {
    let city = {
        id: null,
        name: new Date().getTime().toString(),
        land_id: 1        
    }

    let model = require('./city.model');
    it('should create a new city', function (done) {
        model.createCity(city, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            city.id = result.insertId;
            done();
        });
    }); 
    it('should get all available cities', function (done) {
        model.getCities(null, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            done();
        });
    }); 
    it('should get the created city', function (done) {
        model.getCityById(city.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(city.name);
            done();
        });
    }); 
    it('should update the created city', function (done) {
        city.name = 'Cityx';
        model.updateCityById(city.id, city, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    }); 
    
    it('should delete the created city', function (done) {
        model.deleteCityById(city.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    }); 
});

describe('City Request Test', function () {
    let city = {
        id: null,
        name: new Date().getTime().toString(),
        land_id: 1
    }
    it('should create a new city per POST on /api/cities', function (done) {
        chai.request(app)
            .post('/api/cities')
            .send(city)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                city.id = result.body.insertId;
                done();
            });
    }); 
    it('should get all available cities per GET on /api/cities', function (done) {
        chai.request(app)
            .get('/api/cities')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    }); 
    it('should get the created city per GET on /api/cities/:ctid', function (done) {
        chai.request(app)
            .get('/api/cities/' + city.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('name').which.is.equal(city.name);
                done();
            });
    }); 
    it('should update the created city per PUT on /api/cities/:ctid', function (done) {
        city.name = 'changed City';
        chai.request(app)
            .put('/api/cities/' + city.id)
            .send(city)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    }); 
    it('should delete the created city per DELETE on /api/cities/:ctid', function (done) {
        chai.request(app)
            .delete('/api/cities/' + city.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    }); 
 });