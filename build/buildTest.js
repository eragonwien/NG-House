var chai = require('chai');
var expect = chai.expect;
var helper = require('./helper');
describe('Get List from String Test', function () {
    var test = helper.getListFromString;

    it('should work in standard case', function (done) {
        var testCase = 'a,b,b,b,c,c';
        var result = test(testCase);
        expect(result).to.have.lengthOf(6);
        done();
    });
    it('should work when there is a comma in the last index', function (done) {
        var testCase = 'a,b,b,b,c,c,';
        var result = test(testCase);
        expect(result).to.have.lengthOf(6);
        done();
    });
    it('should work when there is a comma in front', function (done) {
        var testCase = ',a,b,b,b,c,c';
        var result = test(testCase);
        expect(result).to.have.lengthOf(6);
        done();
    });
    it('should work if no comma is found', function (done) {
        var testCase = 'a';
        var result = test(testCase);
        expect(result).to.have.lengthOf(1);
        done();
    });
});

describe('get random int test', function () {
    var test = helper.getRandomInt;
    it('should return a result between the min and max', function (done) {
        var min = 3, max = 8;
        var result = test(min, max);
        expect(result <= max).to.be.true;
        expect(result >= min).to.be.true;
        done();
    }); 
    it('should return a result if only one params is avaiable', function (done) {
        var max = 8;
        var result = test(max);
        expect(result <= max).to.be.true;
        expect(result >= 0).to.be.true;
        done();
    }); 
});

describe('extract values from list test', function () {
    var test = helper.filterValuesOfList;
    var list = [{name: 'A', id: 'A0'}, {name: 'R'}, {name: 'U', id: 'U2'}, {name: 'D'}];    
    it('should return a list of the key values', function (done) {
        var result = test(list, 'name');
        expect(result).to.have.lengthOf(list.length);
        expect(result[0]).to.be.equal(list[0].name);
        done();
    });
    it('should return a list of the key values without undefined values', function (done) {
        var result = test(list, 'id');
        expect(result).to.have.lengthOf(2);
        expect(result[0]).to.be.equal(list[0].id);
        done();
    });
    
});