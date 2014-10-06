var test = require('tap').test;
var chester = require('../chester')(20,20);

test('move chester forward', function(t) {
  chester.moveForward(function(e, pos) {
    t.equals(pos[0], 0);
    t.equals(pos[1], 1);
    t.end();
  });
});


