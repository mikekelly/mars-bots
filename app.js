var Mars = require('./lib/mars');

var runFromTextInput = function(str) {
  var state = parseState(str);

  var world = new Mars.World();
  world.seed(state);
  world.play();

  return outputWorld(world);
};

var parseState = function(str) {
  var lines = str.split('\n');

  var topRight = lines.shift().split(' ').map(function(coord) {
    return parseInt(coord,10);
  });

  var botCount = lines.length / 2;
  var bots = [];

  for (var i = 0; i < botCount; i++) {
    var start = lines.shift().split(' ');

    var direction = start.pop();
    start = start.map(function(coord) {
      return parseInt(coord, 10);
    });
    start.push(direction);

    var instructions = lines.shift().split('');
    bots.push({
      start: start,
      instructions: instructions
    });
  }

  return {
    topRight: topRight,
    bots: bots
  };
};

var outputWorld = function(world) {
  var out = "";

  world.bots.forEach(function(bot) {
    out += bot.coordinates.join(' ');
    out += ' ' + bot.direction;
    if (bot.lost) {
      out += ' LOST';
    }
    out += '\n';
  });

  return out;
};

var input = "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL";
require('sys').puts(runFromTextInput(input));
