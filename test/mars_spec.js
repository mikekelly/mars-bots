var sinon = require('sinon'),
    should = require('should'),
    Mars = require('../lib/mars');

var exampleState = {
  topRight: [5,5],
  bots: [{
    start: [1,1,'E'],
    instructions: ['R','F','R','F','R','F','R','F']
  }]
};


describe("Mars", function() {
  describe("World", function() {
    var world, Surface, Bot;

    before(function() {
      Surface = sinon.stub();
      Bot = sinon.stub();
      world = new Mars.World(Surface, Bot);
    });

    describe("#seed", function() {
      before(function() {
        world.seed(exampleState);
      });

      it("creates a surface", function() {
        Surface.calledWith(exampleState.topRight).should.eql(true);
        Surface.calledWithNew().should.eql(true);
      });

      it("creates the bots", function() {
        Bot.calledWith(exampleState.bots[0]).should.eql(true);
        Bot.calledWithNew().should.eql(true);
      });
    });

    describe("#play", function() {
      var mockBot;

      before(function() {
        var bot = { roam: function() {} };
        mockBot = sinon.mock(bot);
        world.bots = [bot];
      });

      it("makes each bot roam over the surface", function() {
        mockBot.expects('roam').withArgs(world.surface);
        world.play();
        mockBot.verify();
      });
    });
  });
});
