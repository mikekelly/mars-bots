var sinon = require('sinon'),
    should = require('should'),
    Surface = require('../lib/surface');

describe("Surface", function() {
  var surface, coords;
  beforeEach(function() {
    coords = [5,5];
    surface = new Surface(coords);
  });
  describe("#leaveScent", function() {
    it("leaves a scent at a bot's coordinates", function() {
      var bot = {
        coordinates: [5,6],
        direction: 'N'
      };
      surface.leaveScent(bot);
      surface.getPoint(bot.coordinates).scents.N.should.equal(true);
    });
  });

  describe("#getPoint", function() {
    it("returns the coordinate object", function() {
      var x = 1,
          y = 2,
          obj = { foo: 'bar' };
      surface.coordinates[x] = {};
      surface.coordinates[x][y] = obj;
      surface.getPoint([x,y]).should.equal(obj);
    });
    it("returns a blank coordinate object for fresh coords", function() {
      should.exist(surface.getPoint([50,50]));
    });
  });

  describe("#hasScent", function() {
    var direction = 'N';
    it("returns true if the coordinates and direction has a scent", function() {
      surface.getPoint(coords).scents[direction] = true;
      surface.hasScent(coords, direction).should.eql(true);
    });

    it("returns false if the coordinates and direction don't have a scent", function() {
      surface.hasScent(coords, direction).should.eql(false);
    });
  });

  describe("#includesCoordinates", function() {
    it("returns true if the coordinates are within the bounds of the surface", function() {
      surface.includesCoordinates(coords).should.eql(true);
    });

    it("returns true if the coordinates are out of bounds", function() {
      surface.includesCoordinates([6,6]).should.eql(false);
    });
  });

  describe("#leaveScent", function() {
    it("takes the bot and leaves a scent at its position", function() {
      var bot = {
        coordinates: [2,2],
        direction: 'N'
      };
      surface.hasScent(bot.coordinates, bot.direction).should.eql(false);
      surface.leaveScent(bot);
      surface.hasScent(bot.coordinates, bot.direction).should.eql(true);
    });
  });
});
