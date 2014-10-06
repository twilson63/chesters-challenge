var makeGame = require('../game');
var _ = require('underscore');

angular.module('app', [])
  .controller('MainCtrl', function($scope) {
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
          $scope.score = score;
          $scope.rows[p[0]].cols[p[1]].value = 'images/chester.gif';  
        });
      });

      game.on('end', function(score) {
        alert('Game Over ' + score);
      });
    };
    
    $scope.reset();
  });