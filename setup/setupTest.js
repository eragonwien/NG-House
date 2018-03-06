var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
var assert = chai.assert;
var checkDb = require('./checkDb');

describe('check correctness of compare array function', function () {
    var array_long = ['a', 'b', 'bb', 'vcc'];
    var array_long_false = ['b', 'bvv', 'klk', 'fgh'];
    var array_long_duplicate = ['a', 'b', 'vcc', 'a'];
    var array_short = ['a', 'bb', 'vcc'];
    it('should return true if the container contains the array', function (done) {
        expect(checkDb.doesContainerHasArray(array_long, array_short)).to.be.true;
        done();    
    })
    it('should return true if the container is the same as the array', function (done) {
        expect(checkDb.doesContainerHasArray(array_long, array_long)).to.be.true;
        done();   
    })
    it('should return false if the container is smaller than the array', function (done) {
        expect(checkDb.doesContainerHasArray(array_short, array_long)).to.be.false;
        done();   
    })
    it('should return false if the container does not have all the elements of the array', function (done) {
        expect(checkDb.doesContainerHasArray(array_long_false, array_short)).to.be.false;
        done();   
    })
    it('should return true if the container have all the elements of the array and a duplicate element', function (done) {
        expect(checkDb.doesContainerHasArray(array_long_duplicate, array_short)).to.be.false;
        done();   
    })
})