let chai = require('chai');
let expect = chai.expect;
let helper = require('./helper');
describe('Get List from String Test', function () {
    let test = helper.getListFromString;

    it('should work in standard case', function (done) {
        let testCase = 'a,b,b,b,c,c';
        let result = test(testCase);
        expect(result).to.have.lengthOf(6);
        done();
    });
    it('should work when there is a comma in the last index', function (done) {
        let testCase = 'a,b,b,b,c,c,';
        let result = test(testCase);
        expect(result).to.have.lengthOf(6);
        done();
    });
    it('should work when there is a comma in front', function (done) {
        let testCase = ',a,b,b,b,c,c';
        let result = test(testCase);
        expect(result).to.have.lengthOf(6);
        done();
    });
    it('should work if no comma is found', function (done) {
        let testCase = 'a';
        let result = test(testCase);
        expect(result).to.have.lengthOf(1);
        done();
    });
});

describe('get random int test', function () {
    let test = helper.getRandomInt;
    it('should return a result between the min and max', function (done) {
        let min = 3, max = 8;
        let result = test(min, max);
        expect(result <= max).to.be.true;
        expect(result >= min).to.be.true;
        done();
    }); 
    it('should return a result if only one params is avaiable', function (done) {
        let max = 8;
        let result = test(max);
        expect(result <= max).to.be.true;
        expect(result >= 0).to.be.true;
        done();
    }); 
});

describe('extract values from list test', function () {
    let test = helper.filterValuesOfList;
    let list = [{name: 'A', id: 'A0'}, {name: 'R'}, {name: 'U', id: 'U2'}, {name: 'D'}];    
    it('should return a list of the key values', function (done) {
        let result = test(list, 'name');
        expect(result).to.have.lengthOf(list.length);
        expect(result[0]).to.be.equal(list[0].name);
        done();
    });
    it('should return a list of the key values without undefined values', function (done) {
        let result = test(list, 'id');
        expect(result).to.have.lengthOf(2);
        expect(result[0]).to.be.equal(list[0].id);
        done();
    });
    
});