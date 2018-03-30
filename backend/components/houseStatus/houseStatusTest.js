let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('House Status Model Test', function () {
    let houseStatus = {
        id: null,
        name: new Date().getTime().toString()
    }
    let model = require('./houseStatusModel');
    it('should create a house status', function (done) {
        model.createHouseStatus(houseStatus, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            houseStatus.id = result.insertId;
            done(); 
        });
    });
    it('should get all house statuses', function (done) {
        model.getAllHouseStatuses(function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done(); 
        });
    });
    it('should get a house status by id', function (done) {
        model.getHouseStatusById(houseStatus.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(houseStatus.name);
            done(); 
        });
    });
    it('should update a house status', function (done) {
        model.updateHouseStatusById(houseStatus.id, houseStatus, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
    it('should delete a house status', function (done) {
        model.deleteHouseStatusById(houseStatus.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
});

describe('House Status Request Test', function () {
    let houseStatus = {
        id: null,
        name: new Date().getTime().toString()
    }
    it('should create a house status per POST on /api/houseStatuses', function (done) {
        chai.request(app)
            .post('/api/houseStatuses')
            .send(houseStatus)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                houseStatus.id = result.body.insertId;
                done();
            });
    });
    it('should get all house statuss per GET on /api/houseStatuses', function (done) {
        chai.request(app)
            .get('/api/houseStatuses')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get a house status by id per GET on /api/houseStatuses/:hsid', function (done) {
        chai.request(app)
            .get('/api/houseStatuses/' + houseStatus.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('name').which.is.equal(houseStatus.name);
                done();
            });
    });
    it('should update a house status per PUT on /api/houseStatuses/:hsid', function (done) {
        chai.request(app)
            .put('/api/houseStatuses/' + houseStatus.id)
            .send(houseStatus)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('should delete a house status per DELETE on /api/houseStatuses/:hsid', function (done) {
        chai.request(app)
            .delete('/api/houseStatuses/' + houseStatus.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
});