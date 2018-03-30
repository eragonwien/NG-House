let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);
var debug = require('debug')('tag_test');

describe('Tag Model Test', function () {
    let tag = {
        id: null,
        name: 'FAKER'
    };
    let model = require('./tagModel');
    it('should create a new tag', function (done) {
        model.createTag(tag, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            tag.id = result.insertId;
            done();
        })
    });
    it('should get all tags', function (done) {
        model.getAllTags(function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            done();
        })
    });
    it('should get the created tag', function (done) {
        model.getTagById(tag.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(tag.name);
            done();
        });
    });
    it('should update the tag', function (done) {
        model.updateTagById(tag.id, tag, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    });
    it('delete the created tag', function (done) {
        model.deleteTagById(tag.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        });
    });
});

describe('Tag Request Test', function () {
    let tag = {
        id: null,
        name: 'FAKERR'
    };
    it('should create a new tag per POST on /api/tags', function (done) {
        chai.request(app)
            .post('/api/tags')
            .send(tag)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.have.property('insertId');
                tag.id = result.body.insertId;
                done();
            })
    });
    it('should get all tags per GET on /api/tags', function (done) {
        chai.request(app)
            .get('/api/tags')
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should get the created tag per GET on /api/tags/:cid', function (done) {
        chai.request(app)
            .get('/api/tags/' + tag.id)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('name').which.is.equal(tag.name);
                done();
            });
    });
    it('should update the tag per PUT on /api/tags/:cid', function (done) {
        chai.request(app)
            .put('/api/tags/' + tag.id)
            .send(tag)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            });
    });
    it('delete the created tag per DELETE on /api/tags/:cid', function (done) {
        chai.request(app)
            .delete('/api/tags/' + tag.id)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            })
    }); 
});