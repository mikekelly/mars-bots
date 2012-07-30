var Mars = require('../lib/mars'),
    should = require('should'),
    state = {
      topRight: [5,3],
      bots: [{
        start: [1,1,'E'],
        instructions: ['R','F','R','F','R','F','R','F']
      },{
        start: [3,2,'N'],
        instructions: ['F','R','R','F','L','L','F','F','R','R','F','L','L']
      },{
        start: [0,3,'W'],
        instructions: ['L','L','F','F','F','L','F','L','F','L']
      }]
    };

describe("World", function() {
  it("should seed and play world, resulting in a correct state", function() {
    var world = new Mars.World();
    world.seed(state);
    world.play();
    var bots = world.bots;
    bots[0].coordinates.should.eql([1,1]);
    bots[0].direction.should.eql('E');
    bots[0].lost.should.eql(false);
    bots[1].coordinates.should.eql([3,3]);
    bots[1].direction.should.eql('N');
    bots[1].lost.should.eql(true);
    bots[2].coordinates.should.eql([2,3]);
    bots[2].direction.should.eql('S');
    bots[2].lost.should.eql(false);
  });
});
