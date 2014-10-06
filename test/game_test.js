var test = require('tap').test;
var makeGame = require('../game');

test('play a game of chesters challenge', function(t) {
  var game = makeGame();

  game.on('turn', function(p, score) {
    console.log(p);
    console.log(score);
  });
  game.on('end', function(score) {
    console.log('game over');
    t.end();
  });

  game.on('ready', function(board) {
    console.log(board);
    game.play([
      'moveForward', 
      'moveForward', 
      'moveForward', 
      'moveForward', 
      'turnRight',
      'moveForward',
      'moveForward',
      'turnLeft',
      'moveForward',
      'moveForward', 
      'moveForward', 
      'moveForward', 
      'moveForward', 
      'turnRight',
      'moveForward',
      'moveForward',
      'turnLeft',
      'moveForward',
      'turnRight',
      'turnRight',
      'moveForward',
      'moveForward'
    ]);    
  });
  

});