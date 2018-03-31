'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('Land Model Test', function () {
    let land = {
        id: null,
        name: new Date().getTime().toString()
    }

    let model = require('./land.model');
    it('should create a new land', function (done) {
        model.createLand(land, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            land.id = result.insertId;
            done();
        });
    }); 
    it('should get all available lands', function (done) {
        model.getLands(null, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            done();
        });
    }); 
    it('should get the created land', function (done) {
        model.getLandById(land.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(land.name);
            done();
        });
    }); 
    it('should update the created land', function (done) {
        land.name = 'Landx';
        model.updateLandById(land.id, land, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    }); 
    
    it('should delete the created land', function (done) {
        model.deleteLandById(land.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    }); 
});

describe('Land Request Test', function () {
    let land = {
        id: null,
        name: new Date().getTime().toString()
    }
    it('should create a new land per POST on /api/lands', function (done) {
        chai.request(app)
            .post('/api/lands')
            .send(land)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                land.id = result.body.insertId;
                done();
            });
    }); 
    it('should get all available lands per GET on /api/lands', function (done) {
        chai.request(app)
            .get('/api/lands')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    }); 
    it('should get the created land per GET on /api/lands/:rid', function (done) {
        chai.request(app)
            .get('/api/lands/' + land.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('name').which.is.equal(land.name);
                done();
            });
    }); 
    it('should update the created land per PUT on /api/lands/:rid', function (done) {
        land.name = 'changed Land';
        chai.request(app)
            .put('/api/lands/' + land.id)
            .send(land)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    }); 
    it('should delete the created land per DELETE on /api/lands/:rid', function (done) {
        chai.request(app)
            .delete('/api/lands/' + land.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    }); 
 });