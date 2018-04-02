let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('House Tag Model Test', function () {
    let houseTag = {
        id: null,
        tag_id: 1,
        house_id: 1
    };
    let model = require('./house.tag.model');
    it('should create a house tag', function (done) {
        model.createHouseTag(houseTag, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            houseTag.id = result.insertId;
            done(); 
        });
    });
    it('should get all house tags', function (done) {
        model.getHouseTags(null, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done(); 
        });
    });
    it('should get a house tag by id', function (done) {
        model.getHouseTagById(houseTag.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('tag_id').which.is.equal(houseTag.tag_id);
            expect(result).to.have.property('house_id').which.is.equal(houseTag.house_id);
            done(); 
        });
    });
    it('should update a house tag', function (done) {
        model.updateHouseTagById(houseTag.id, houseTag, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
    it('should delete a house tag', function (done) {
        model.deleteHouseTagById(houseTag.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done(); 
        });
    });
});

describe('House Tag Request Test', function () {
    let houseTag = {
        id: null,
        tag_id: 1,
        house_id: 1
    };
    it('should create a house tag per POST on /api/houseTags', function (done) {
        chai.request(app)
            .post('/api/houseTags')
            .send(houseTag)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                houseTag.id = result.body.insertId;
                done();
            });
    });
    it('should get all house tags per GET on /api/houseTags', function (done) {
        chai.request(app)
            .get('/api/houseTags')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get a house tag by id per GET on /api/houseTags/:htid', function (done) {
        chai.request(app)
            .get('/api/houseTags/' + houseTag.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('tag_id').which.is.equal(houseTag.tag_id);
                expect(result.body).to.have.property('house_id').which.is.equal(houseTag.house_id);
                done();
            });
    });
    it('should update a house tag per PUT on /api/houseTags/:htid', function (done) {
        chai.request(app)
            .put('/api/houseTags/' + houseTag.id)
            .send(houseTag)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('should delete a house tag per DELETE on /api/houseTags/:htid', function (done) {
        chai.request(app)
            .delete('/api/houseTags/' + houseTag.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
});