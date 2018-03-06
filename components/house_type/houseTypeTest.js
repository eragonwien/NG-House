var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('House Type Model Test', function () {
    var houseType = {
        id: null,
        name: 'test type'
    }
    var model = require('./houseTypeModel');
    it('should create a house type', function (done) {
        model.createHouseType(houseType, function (error, result) {
           expect(result).to.be.an('object');
           result.should.be.an('array');
           done(); 
        });
    });
    it('should get all house types');
    it('should get a house type by id');
    it('should update a house type');
    it('should delete a house type');
});

describe('House Type Request Test', function () {
    it('should create a house type per POST on /api/houseTypes');
    it('should get all house types per GET on /api/houseTypes');
    it('should get a house type by id per GET on /api/houseTypes/:htid');
    it('should update a house type per PUT on /api/houseTypes/:htid');
    it('should delete a house type per DELETE on /api/houseTypes/:htid');
});