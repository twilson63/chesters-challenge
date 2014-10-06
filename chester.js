var cu = require('auto-curry');

module.exports = function(boundsX, boundsY) {
  var x = 0;
  var y = 0;
  var facing = 'right';
  
  var move = cu(function(dir, cb) {
    if (dir === 'forward') {
      if (facing === 'right') {
        if (y === (boundsY - 1)) { return cb('right wall'); }
        y++;
        return cb(null, [x,y]);
      } else if (facing === 'down') {
        if (x === (boundsX - 1)) { return cb('bottom wall'); }
        x++;
        return cb(null, [x, y]);
      } else if (facing === 'left') {
        if (y === 0) { return cb('left wall'); }
        y--;
        return cb(null, [x, y]);
      } else if (facing === 'up') {
        if (x === 0) { return cb('top wall'); }
        x--;
        return cb(null, [x, y]);
      }
    } else if (dir === 'backward' ) {
      if (facing === 'right') {
        if (y === 0) { return cb('left wall'); }
        y--;
        return cb(null, [x, y]);
      } else if (facing === 'down') {
        if (x === 0) { return cb('top wall'); }
        x--;
        return cb(null, [x, y]);
      } else if (facing === 'left') {
        if (y === (boundsY - 1)) { return cb('right wall'); }
        y++;
        return cb(null, [x, y]);
      } else if (facing === 'up') {
        if (x === (boundsX - 1)) { return cb('bottom wall'); }
        x++;
        return cb(null, [x, y]);
      }  
    }
    cb('No Action');
  });
  var turn = cu(function(dir, cb) {
    if (facing === 'right' && dir === 'right') { facing = 'down'; }
    else if (facing === 'down' && dir === 'right') { facing = 'left'; }
    else if (facing === 'left' && dir === 'right') { facing = 'up'; }
    else if (facing === 'up' && dir === 'right') { facing = 'right'; }

    else if (facing === 'right' && dir === 'left') { facing = 'up'; }
    else if (facing === 'down' && dir === 'left') { facing = 'right'; }
    else if (facing === 'left' && dir === 'left') { facing = 'down'; }
    else if (facing === 'up' && dir === 'left') { facing = 'left'; }

    cb(null, [x, y]);
  });
  
  return Object.freeze({
    moveForward: move('forward'),
    moveBackward: move('backward'),
    turnRight: turn('right'),
    turnLeft: turn('left')
  });
}