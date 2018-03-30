let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

describe('Bookmark Model Test', function () {
    let bookmark = {
        id: null,
        user_id: 1,
        house_id: 1
    };
    let model = require('./bookmarkModel');
    it('should create a new bookmark', function (done) {
        model.createBookmark(bookmark, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            bookmark.id = result.insertId;
            done();
        })
    });
    it('should get all bookmarks', function (done) {
        model.getAllBookmarks(function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            done();
        })
    });
    it('should get the created bookmark', function (done) {
        model.getBookmarkById(bookmark.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('bookmarker_id').which.is.equal(bookmark.user_id);
            expect(result).to.have.property('house_id').which.is.equal(bookmark.house_id);
            done();
        })
    });
    it('should get the created bookmark of the given user', function (done) {
        model.getBookmarksByUser(bookmark.user_id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            done();
        })
    });
    it('should update the bookmark', function (done) {
        model.updateBookmarkById(bookmark.id, bookmark, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        })
    });
    it('delete the created bookmark', function (done) {
        model.deleteBookmarkById(bookmark.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').which.is.greaterThan(0);
            done();
        })
    });
});

describe('Bookmark Request Test', function () {
    let bookmark = {
        id: null,
        user_id: 1,
        house_id: 1
    };
    it('should create a new bookmark per POST on /api/bookmarks', function (done) {
        chai.request(app)
            .post('/api/bookmarks')
            .send(bookmark)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.have.property('insertId');
                bookmark.id = result.body.insertId;
                done();
            })
    });
    it('should get all bookmarks per GET on /api/bookmarks', function (done) {
        chai.request(app)
            .get('/api/bookmarks')
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            })
    });
    it('should get the created bookmark per GET on /api/bookmarks/:bmid', function (done) {
        chai.request(app)
            .get('/api/bookmarks/' + bookmark.id)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('bookmarker_id').which.is.equal(bookmark.user_id);
                expect(result.body).to.have.property('house_id').which.is.equal(bookmark.house_id);
                done();
            })
    });
    it('should list all bookmark of the given user per GET on /api/users/:uid/bookmarks', function (done) {
        chai.request(app)
            .get('/api/users/' + bookmark.user_id + '/bookmarks')
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            })
    });
    it('should update the bookmark per PUT on /api/bookmarks/:bmid', function (done) {
        chai.request(app)
            .put('/api/bookmarks/' + bookmark.id)
            .send(bookmark)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();                
            });
    });
    it('delete the created bookmark per DELETE on /api/bookmarks/:bmid', function (done) {
        chai.request(app)
            .delete('/api/bookmarks/' + bookmark.id)
            .end(function (error, result) {
                expect(error).to.be.null;
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('affectedRows').which.is.greaterThan(0);
                done();
            })
    }); 
});