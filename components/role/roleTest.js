var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('Role Model Test', function () {
    var role = {
        id: null,
        name: 'Secret Agent'
    }
    var model = require('./roleModel');
    it('should create a new role', function (done) {
        model.createRole(role, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('insertId');
            role.id = result.insertId;
            done();
        });
    }); 
    it('should get all available roles', function (done) {
        model.getAllRoles(function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            done();
        });
    }); 
    it('should get the created role', function (done) {
        model.getRoleById(role.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('name').which.is.equal(role.name);
            done();
        });
    }); 
    it('should update the created role', function (done) {
        role.name = 'Rolex';
        model.updateRoleById(role.id, role, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            model.getRoleById(role.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.an('object');
                expect(result).to.have.property('name').which.is.equal(role.name);
                done();
            });
        });
    }); 
    
    it('should delete the created role', function (done) {
        model.deleteRoleById(role.id, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            model.getRoleById(role.id, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.undefined;
                done();
            });
        });
    }); 
});

describe('Role Request Test', function () {
    var role = {
        id: null,
        name: 'Secret Agent'
    }
    it('should create a new role per POST on /api/roles', function (done) {
        chai.request(app)
            .post('/api/roles')
            .send(role)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.have.property('insertId');
                role.id = result.body.insertId;
                done();
            });
    }); 
    it('should get all available roles per GET on /api/roles', function (done) {
        chai.request(app)
            .get('/api/roles')
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            });
    }); 
    it('should get the created role per GET on /api/roles/:rid', function (done) {
        chai.request(app)
            .get('/api/roles/' + role.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('name').which.is.equal(role.name);
                done();
            });
    }); 
    it('should update the created role per PUT on /api/roles/:rid', function (done) {
        role.name = 'changed Role';
        chai.request(app)
            .put('/api/roles/' + role.id)
            .send(role)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                chai.request(app)
                    .get('/api/roles/' + role.id)
                    .end(function (error, result) {
                        expect(result).to.have.status(200);
                        expect(result.body).to.have.property('name').which.is.equal(role.name);
                        done();
                    });
            });
    }); 
    it('should delete the created role per DELETE on /api/roles/:rid', function (done) {
        chai.request(app)
            .delete('/api/roles/' + role.id)
            .end(function (error, result) {
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('object');
                chai.request(app)
                    .get('/api/roles/' + role.id)
                    .end(function (error, result) {
                        expect(result).to.have.status(200);
                        expect(result.body).to.be.empty;
                        done();
                    });
            });
    }); 
 });