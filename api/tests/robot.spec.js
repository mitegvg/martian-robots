require("chai").should();

const Robot = require('../objects/robot');


describe("Robot object tests", function(){
  var robot;

  beforeEach(function(){
    robot = new Robot(1,1,'N',{x:2,y:2},[]);
  });

  describe("Given a robot is created, and robot object is initiated", function(){
    it("should have x, y and direction set", function(done){
    	robot.x.should.not.be.eql(undefined);
    	robot.y.should.not.be.eql(undefined);
    	robot.direction.should.not.be.eql(undefined);
        done();
    });
   });

  describe("Given a robot turns to the left", function(){
    it("should change direction to west", function(done){
    	robot.changeDirection('L');
    	robot.direction.should.be.eql('W');
        done();
    });
   });

  describe("Given a robot moves forward", function(){
    it("should change the coordinate position of the robot", function(done){
    	robot.moveForward();
    	robot.y.should.be.eql(2);
        done();
    });
   });
})