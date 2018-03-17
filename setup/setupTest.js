var chai = require('chai');
var expect = chai.expect;
describe('Get List from String Test', function () {
    var test = require('./helper').getListFromString;

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