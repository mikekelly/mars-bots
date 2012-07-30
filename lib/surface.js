var Surface = function(coords) {
  this.xLimit = coords[0];
  this.yLimit = coords[1];
  this.coordinates = {};
};

Surface.prototype.leaveScent = function(bot) {
  this.getPoint(bot.coordinates).scents[bot.direction] = true;
  return this;
};

Surface.prototype.getPoint = function(coords) {
  var x = coords[0],
      y = coords[1];
  this.coordinates[x] = this.coordinates[x] || { scents: {} };
  this.coordinates[x][y] = this.coordinates[x][y] || { scents: {} };
  return this.coordinates[x][y];
};

Surface.prototype.hasScent = function(coords, direction) {
  return this.getPoint(coords).scents[direction] === true;
};

Surface.prototype.includesCoordinates = function(coords) {
  var x = coords[0],
      y = coords[1];
  return 0 <= x && x <= this.xLimit && 0 <= y && y <= this.yLimit;
};

module.exports = Surface;
