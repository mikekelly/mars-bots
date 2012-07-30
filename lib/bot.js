var Bot = function(opts) {
  this.direction = opts.start.pop();
  this.coordinates = opts.start;
  this.instructions = opts.instructions;
  this.lost = false;
};

module.exports = Bot;

Bot.prototype.roam = function(surface) {
  var self = this;
  this.surface = surface;
  this.instructions.forEach(function(instruction) {
    self.command(instruction);
  });
};

Bot.prototype.command = function(command) {
  if(!this.lost) {
    commands[command].call(this);
  }
};

var commands = {
  F: function() {
    if(!this.surface.hasScent(this.coordinates, this.direction)) {
      var next = forwardOutcomes[this.direction](this.coordinates);
      if(this.surface.includesCoordinates(next)) {
        this.coordinates = next;
      } else {
        this.lost = true;
        this.surface.leaveScent(this);
      }
    }
  },
  L: function() {
    this.direction = turnOutcomes[this.direction].L;
  },
  R: function() {
    this.direction = turnOutcomes[this.direction].R;
  }
};

var turnOutcomes = {
  N: {
    L: 'W',
    R: 'E'
  },
  E: {
    L: 'N',
    R: 'S'
  },
  S: {
    L: 'E',
    R: 'W'
  },
  W: {
    L: 'S',
    R: 'N'
  }
};

var forwardOutcomes = {
  N: function(coords) {
    var x = coords[0],
        y = coords[1];
    return [x,y+1];
  },
  E: function(coords) {
    var x = coords[0],
        y = coords[1];
    return [x+1, y];
  },
  S: function(coords) {
    var x = coords[0],
        y = coords[1];
    return [x,y-1];
  },
  W: function(coords) {
    var x = coords[0],
        y = coords[1];
    return [x-1,y];
  }
};
