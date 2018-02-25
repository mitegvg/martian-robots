require("chai").should();

const processCommandRequest = require('../utils/process-command');


describe("Robot object tests", function(){

  beforeEach(function(){

  });

  describe("Given a command is given to a robot", function(){
    it("should make the robot move forward", function(done){
      processCommandRequest({commandFirst:'11N',commandSecond:'F'},{x:3,y:3},[]).then(function(res){
        res.location.should.be.eql('1 2 N ');
        done();
      });
    });
    it("should make the robot turn left", function(done){
      processCommandRequest({commandFirst:'11N',commandSecond:'LL'},{x:3,y:3},[]).then(function(res){
        res.location.should.be.eql('1 1 S ');
        done();
      });
    });
   });

})