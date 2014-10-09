var makeGame = require('./game');
var _ = require('underscore');

angular.module('app', ['ngAudio'])
  .controller('MainCtrl', function($scope, ngAudio) {
    $scope.chesterMoving = ngAudio.load("sounds/marker-writing.mp3");
    $scope.gotGrape = ngAudio.load('sounds/magic-chime.mp3');
    
    var game;
    $scope.score = 0;
    
    $scope.hide = function() {
      $scope.hideBillboard = true;
    };
    $scope.play = function() {
      game.play($scope.instructions);  
    };
    
    $scope.addCmd = function(cmd) {
      $scope.instructions.push(cmd);
    };
    
    $scope.reset = function() {
      ngAudio.unmute();
      $scope.score = 0;
      $scope.rows = _.times(10, function() {
        return { cols: _.times(10, function() { return { value: 'images/spacer.gif' }; }) };
      });

      $scope.rows[0].cols[0].value = 'images/chester.gif';
      $scope.instructions = [];
      game = makeGame();

      game.on('ready', function(grapes) {
        _(grapes).each(function(p) {
          $scope.$apply(function(){
            $scope.rows[p[0]].cols[p[1]].value = 'images/grape.jpg';  
          });
        });
      });

      game.on('turn', function(p, score) {
        $scope.$apply(function(){
          if ($scope.score === score) { $scope.chesterMoving.play(); }
          if ($scope.score !== score) { $scope.gotGrape.play(); }

          $scope.score = score;
          $scope.rows[p[0]].cols[p[1]].value = 'images/chester.gif';  
          
          setTimeout(function() {
            $scope.chesterMoving.stop();
            $scope.gotGrape.stop();
          }, 300);
          
        });
      });

      game.on('end', function(score) { 
        //ngAudio.mute();
        alert('Game Over ' + score);
      });
    };
    
    $scope.reset();
  });