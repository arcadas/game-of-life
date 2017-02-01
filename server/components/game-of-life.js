/**
 * Game of Life logic
 */
module.exports = function(world, size) {

  var evolve = function() {
    // Fill up empty neighbours cells
    for (var x in world) {
      if (world.hasOwnProperty(x)) {
        for (var y in world[x]) {
          if (world[x].hasOwnProperty(y)) {
            fillEmptyCells(parseInt(x), parseInt(y));
          }
        }
      }
    }
    // Evolve by neighbours cells
    for (var x in world) {
      if (world.hasOwnProperty(x)) {
        for (var y in world[x]) {
          if (world[x].hasOwnProperty(y)) {
            var aliveNeighboursCount = getNumberOfAliveNeighbours(parseInt(x), parseInt(y));
            if (world[x][y].state) {
              world[x][y].evolvedState = (aliveNeighboursCount > 3 || aliveNeighboursCount < 2) ? 0 : 1;
            } else {
              world[x][y].evolvedState = (aliveNeighboursCount === 3) ? 1 : 0;
            }
          }
        }
      }
    }
    // Remove dead cells and set final state by evolved state
    for (var x in world) {
      if (world.hasOwnProperty(x)) {
        for (var y in world[x]) {
          if (world[x].hasOwnProperty(y)) {
            // We do not allow the life out of our world
            if ((!world[x][y].evolvedState) || (x < 0 || y < 0 || x > size || y > size)) {
              delete world[x][y];
            } else {
              world[x][y] = { state: 1, evolvedState: undefined };
            }
          }
        }
      }
    }
  }

  var fillEmptyCells = function(x, y) {
    return setUndefinedCell(x+1, y)
      + setUndefinedCell(x-1, y)
      + setUndefinedCell(x, y+1)
      + setUndefinedCell(x, y-1)
      + setUndefinedCell(x+1, y-1)
      + setUndefinedCell(x-1, y-1)
      + setUndefinedCell(x+1, y+1)
      + setUndefinedCell(x-1, y+1);
  }

  var setUndefinedCell = function(x, y) {
    if (typeof world[x] === 'undefined') {
      world[x] = {};
    }
    if ((typeof world[x][y] === 'undefined') ||
        (typeof world[x][y].state === 'undefined')) {
        world[x][y] = { state: 0, evolvedState: undefined };
    }
  }

  var getNumberOfAliveNeighbours = function(x, y) {
    return isAlive(x+1, y)
      + isAlive(x-1, y)
      + isAlive(x, y+1)
      + isAlive(x, y-1)
      + isAlive(x+1, y-1)
      + isAlive(x-1, y-1)
      + isAlive(x+1, y+1)
      + isAlive(x-1, y+1);
  }

  var isAlive = function(x, y) {
    return ((typeof world[x] !== 'undefined') &&
      (typeof world[x][y] !== 'undefined') &&
      (typeof world[x][y].state !== 'undefined') &&
      (world[x][y].state === 1)) ? 1 : 0;
  }

  evolve();

  return world;
};
