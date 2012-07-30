var sinon = require('sinon'),
    Bot = require('../lib/bot');

describe("Bot", function() {
  var bot, startState;
  beforeEach(function() {
    startState = {
      start: [1,1,'N'],
      instructions: ['R','F','R','F','R','F','R','F']
    };
    bot = new Bot(startState);
  });

  describe("#roam", function() {
    var surface, botMock;

    beforeEach(function() {
      surface = { command: function() {} };
      botMock = sinon.mock(bot);
    });

    it("roams the surface, transitioning through its instructions", function() {
      botMock.expects('command').exactly(startState.instructions.length);
      bot.roam(surface);
      bot.surface.should.equal(surface);
      botMock.verify();
    });
  });

  describe("#command", function() {
    describe("forward", function() {
      var surface;

      beforeEach(function() {
        surface = {
          hasScent: function() { return false; },
          includesCoordinates: function() { return true; },
          leaveScent: function() { }
        };
        bot.surface = surface;
      });

      it("can move the bot forward north", function() {
        bot.command('F');
        bot.coordinates.should.eql([1,2]);
      });

      it("can move the bot forward east", function() {
        bot.direction = 'E';
        bot.command('F');
        bot.coordinates.should.eql([2,1]);
      });

      it("can move the bot forward south", function() {
        bot.direction = 'S';
        bot.command('F');
        bot.coordinates.should.eql([1,0]);
      });

      it("can move the bot forward west", function() {
        bot.direction = 'W';
        bot.command('F');
        bot.coordinates.should.eql([0,1]);
      });

      it("doesn't move if it detects a scent on the surface", function() {
        surface.hasScent = function() { return true; };
        bot.command('F');
        bot.coordinates.should.eql([1,1]);
      });

      it("marks itself lost and leaves a scent if it moves off the surface", function() {
        surface.includesCoordinates = function() { return false; };
        var surfaceMock = sinon.mock(surface);
        bot.command('F');
        bot.lost.should.eql(true);
        surfaceMock.verify();
      });
    });

    it("can turn the bot left", function() {
      bot.command('L');
      bot.direction.should.eql('W');
    });

    it("can turn the bot right", function() {
      bot.command('R');
      bot.direction.should.eql('E');
    });
  });
});
