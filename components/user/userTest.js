var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('User Models Test', function () {
    var user = {
        id: null,
        role_id: 2,
        first_name: 'Test',
        last_name: 'Johny',
        username: 'JTest_' + new Date().getTime(),
        password: 'test',
        email: 'JTest_' + new Date().getTime() + '@mail.com',
        address: 'Neubaugasse 78',
        postal_code: '1070',
        city: 'Vienna',
        land: 'Austria'
    }
    var model = require('./userModel');

    it('should create a new user', function (done) {
        model.createUser(user, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.have.property('insertId');
            user.id = result.insertId;
            done();
        })
    });

    it('should find the newly created user by id', function (done) {
        model.getUserById(user.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('id').which.is.equal(user.id);
            expect(result).to.have.property('first_name').which.is.equal(user.first_name);
            expect(result).to.have.property('last_name').which.is.equal(user.last_name);
            expect(result).to.have.property('email').which.is.equal(user.email);
            expect(result).to.have.property('role_id').which.is.equal(user.role_id);
            expect(result).to.have.property('address_id');
            user.address_id = result.address_id;
            expect(result).to.have.property('username').which.is.equal(user.username);
            done();
        })
    });

    it('should find the newly created user by username', function (done) {
        model.getUserByUsername(user.username, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('id').which.is.equal(user.id);
            expect(result).to.have.property('first_name').which.is.equal(user.first_name);
            expect(result).to.have.property('last_name').which.is.equal(user.last_name);
            expect(result).to.have.property('role_id').which.is.equal(user.role_id);
            expect(result).to.have.property('address_id').which.is.equal(user.address_id);
            expect(result).to.have.property('email').which.is.equal(user.email);
            expect(result).to.have.property('username').which.is.equal(user.username);
            done();
        })
    });
    
    it('should list all users', function (done) {
        model.getAllUsers(function (error, results) {
            if (error) {
                return done(error);
            }
            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
            done();
        })    
    });
    it('should update the newly created user', function (done) {
        user.first_name = 'Jimmy';
        user.last_name = 'Teston';
        model.updateUserById(user.id, user, function (error, result) {
            if (error) {
                return done(error);
            }
            model.getUserById(user.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.property('first_name').which.is.equal(user.first_name);
                expect(result).to.have.property('last_name').which.is.equal(user.last_name);
                done();
            })
        })
    });
    it('should delete the newly created user', function (done) {
        model.deleteUserById(user.id, function (error, result) {
            if (error) {
                return done(error);
            }
            model.getUserById(user.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.undefined;
                done();
            })
        })
    });
});

describe('User CRUD Test', function () {
    var user = {
        id: null,
        role_id: 2,
        first_name: 'Test',
        last_name: 'Johny',
        username: 'JTest_' + new Date().getTime(),
        password: 'test',
        email: 'JTest_' + new Date().getTime() + '@mail.com',
        address_id: 1
    }

    it('should create new user per POST on /api/users', function (done) {
        chai.request(app)
            .post('/api/users')
            .send(user)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('insertId');
                user.id = result.body.insertId;
                done();
            });
    });
    it('should get all users per GET on /api/users', function (done) {
        chai.request(app)
            .get('/api/users')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.be.an('array');
                done();
            });
    });
    it('should find user per GET on /api/users/:uid', function (done) {
        chai.request(app)
            .get('/api/users/' + user.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.be.an('object');
                done();
            });
    });
    it('should update user per PUT on /api/users/:uid', function (done) {
        chai.request(app)
            .put('/api/users/' + user.id)
            .send(user)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.be.an('object');
                done();
            });
    });
    it('should delete user per DELETE on /api/users/:uid', function (done) {
        chai.request(app)
            .delete('/api/users/' + user.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.be.an('object');
                done();
            });
    });
})