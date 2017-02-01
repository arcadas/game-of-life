/**
 * Lif file parser
 */
module.exports = function (filename) {

    var fs = require('fs');

    // Load selected file content into array
    var array = fs.readFileSync('./lif/' + filename).toString().split("\n");
    // Init word data
    var world = {
        start: {},
        cells: {}
    };
    // Helper vars
    var comment = true;
    var currentCoords = {};

    // Iterate over file array
    for (i in array) {

        // If this is the head of file (comments)
        if (comment) {
            // Check "P" line
            var line = array[i].split(' ');
            if (line[0] === '#P') {
                comment = false;
                // Store coordinates
                world.start = { x: parseInt(line[1]), y: parseInt(line[2]) };
                currentCoords = { x: parseInt(line[1]), y: parseInt(line[2]) };
            }
        } else {
            // Reset Y coordinate at every new line
            currentCoords.y = world.start.y;
            // Split line to cells
            var line = array[i].split('');
            for (var i = 0; i < line.length; i++) {
                // If this is a new line, register it
                if (typeof world.cells[currentCoords.x] === 'undefined') {
                    world.cells[currentCoords.x] = {};
                }
                // Save cell into the world with alive or dead state
                world.cells[currentCoords.x][currentCoords.y] = { state: line[i] === '*' ? 1 : 0 };
                // Increment Y coordinate
                currentCoords.y = currentCoords.y + 1;
            }
        }

        // Increment X coordinate
        currentCoords.x = currentCoords.x + 1;
    }

    return world.cells;
};
