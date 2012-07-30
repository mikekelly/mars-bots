var Surface = require('./surface'),
    Bot = require('./bot');

var World = function(SurfaceConstructor, BotConstructor) {
  this.Surface = SurfaceConstructor || Surface;
  this.Bot = BotConstructor || Bot;
};

World.prototype.seed = function(state) {
  var self = this;
  this.surface = new this.Surface(state.topRight);
  this.bots = state.bots.map(function(bot) {
    return new self.Bot(bot);
  });
};

World.prototype.play = function() {
  var self = this;
  this.bots.forEach(function(bot) {
    bot.roam(self.surface);
  });
  return this;
};

exports.World = World;
