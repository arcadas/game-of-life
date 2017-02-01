/**
 * Conway's Game of Life API
 *
 * @author Peter Perger <peter.perger@ennosol.eu>
 */

//-----------------------------------------------------------------------------
//  PACKAGES, MODULES
//-----------------------------------------------------------------------------

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var config = require('./config');


//-----------------------------------------------------------------------------
//  DATABASE
//-----------------------------------------------------------------------------

mongoose.connect(config.mongo.uri);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});


//-----------------------------------------------------------------------------
//  MIDDLEWARES
//-----------------------------------------------------------------------------

// CORS
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", config.client.host + ':' + config.client.port);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});
// POST data parser to JSON
app.use(bodyParser.json())


//-----------------------------------------------------------------------------
//  API PUBLIC
//-----------------------------------------------------------------------------

// Public API main page
app.get('/', function (req, res) {

  var gameOfLife = require('./components/game-of-life');
  // http://localhost:3000/?world={%222%22:{%223%22:{%22state%22:1}},%223%22:{%223%22:{%22state%22:1}},%224%22:{%223%22:{%22state%22:1}}}
  res.send(gameOfLife(JSON.parse(req.query.world)));
});


//-----------------------------------------------------------------------------
//  SERVER
//-----------------------------------------------------------------------------

// Start Express server
app.listen(config.api.port, function () {
  console.log('Game of Life API listening on port ' + config.api.port + '...')
});
