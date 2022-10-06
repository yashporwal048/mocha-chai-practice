'use strict'

//jshint expr: true
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.should();

describe('sinon tests', function(){
    var student, schedule;
    this.beforeEach(function() {
        student = {
            dropClass: function(classId, cb) {
                //do stuff
                if(!!cb.dropClass){
                    cb.dropClass()
                }
                else{
                cb();
                }
            },
            addClass: function(schedule){
                if(!schedule.classIsFull()) {
                    return true
                }
                else{
                    return false
                }
            }
        };

        schedule = {
            dropClass: function () {
                console.log('class dropped');
            },
            classIsFull: function(){
                return true;
            }

        };
    });

    describe('student.dropClass', function() {
        it('should call callback', function() {
            // var called = false;
            // function callback() {
            //     called = true;
            // };
            var spy = sinon.spy();
            student.dropClass(1, spy);
            //expect(called).to.be.true;
            spy.called.should.be.true;
        });

        it('should caal the callback and log into the console', function() {
                function onClassDropped() {
                    console.log('onClassDropped called');
                }

                var spy = sinon.spy(onClassDropped);
                
                student.dropClass(1, spy);
                spy.called.should.be.true;
        });

        it('should call the callback even if it is a method of an object', function() {
            sinon.spy(schedule, 'dropClass');
            student.dropClass(1, schedule);
            schedule.dropClass.called.should.be.true;
        })
    });

    describe('student with stubs', function() {
        it('should call a stubbed method', function(){
            var stub = sinon.stub(schedule);
            student.dropClass(1, stub.dropClass);
            stub.dropClass.called.should.be.true;
        });
        it('should return true when class is not full', function(){
            var stub = sinon.stub(schedule);
            stub.classIsFull.returns(false);
            var returnValue = student.addClass(stub);
            returnValue.should.be.true;

        });
    });

    describe('student with mocks', function() {
        it('mocks schedule', function(){
            var mockObject = sinon.mock(schedule);
            var exp = mockObject.expects('classIsFull').once();
            student.addClass(schedule);
            exp.verify();
        });
    });
});