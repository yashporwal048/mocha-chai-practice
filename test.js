'use strict'

//jshint expr: true
var chai = require('chai');
var expect = chai.expect;

chai.should();

function isEven(num) {
    return num % 2 === 0;
}

describe('isEven', function(){
    it('should return true if number is even number', function() {
        isEven(4).should.be.true;
    })
    it('should return false if number is odd number', function() {
        isEven(5).should.be.false;
})
});

function add(num1, num2) {
    return num1+num2;
}

describe('add without setup/teardown', function() {
    beforeEach(function(){
        num = 5;
    });

    var num = 5;
    it('should be 10 when adding 5 to 5', function(){
        num = add(num, 5);
        num.should.equal(10);
    });
    it('should be 12 when adding 5 to 7', function(){
        add(num,7).should.equal(12);
    });
});