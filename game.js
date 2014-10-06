var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var chesterModule = require('./chester');
var util = require('util');
var async = require('async');

module.exports = function(options) {
  var ROWS = 10;
  var COLS = 10;
  var chester = chesterModule(ROWS, COLS);
  var board = [];
  
  function random(v) {
    return Math.floor(Math.random() * v);
  }
  
  function Game() {
    var self = this;
    EventEmitter.call(this);
    // build and emit board
    board = _.times(ROWS, function() { return _.times(COLS, function() { return 's' }); });
    // grapes
    var grapes =  _.times(6, function() {
      var row = random(ROWS);
      var col = random(COLS);
      board[row][col] = 'g';
      return [row, col];
    });
    
    setTimeout(function() {
      self.emit('ready', grapes);  
    });
    
  }
  util.inherits(Game, EventEmitter);
  Game.prototype.getBoard = function(cb) {
    cb(null, board);
  };
  Game.prototype.play = function(instructions) {
    var score = 0;
    var self = this;
    
    // loop through instructions;
    async.eachSeries(instructions, function(cmd, cb) {
      chester[cmd](function(e, p) {
        if (e) { return cb(e); }
        if (board[p[0]][p[1]] === 'g') { score++; }
        setTimeout(function() {
          self.emit('turn', p, score);
          cb(null, p);  
        }, 500);
      });
    }, function(err, results) {
      self.emit('end', score);
    });
    
  }
  
  return Object.freeze(new Game());
}