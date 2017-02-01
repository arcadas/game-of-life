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
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});


//-----------------------------------------------------------------------------
//  MIDDLEWARES
//-----------------------------------------------------------------------------

// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", '*'); // config.client.host + ':' + config.client.port
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", 'Origin, Content-Type, Accept');
  next();
});
// POST data parser to JSON
app.use(bodyParser.json())


//-----------------------------------------------------------------------------
//  API
//-----------------------------------------------------------------------------

// Public API main page
app.get('/', function (req, res) {
  res.send('Game of Life API');
});

// List lif files
app.get('/lif', function (req, res) {
  var glob = require("glob")
  glob("./lif/*.lif", function (er, files) {
    res.send(files.map(function(file) {
      return file.split('/').pop();
    }));
  })
});

// Load lif file and return
app.post('/lif', function (req, res) {
  var lifParser = require('./components/lif-parser');
  res.send(lifParser(req.body.name));
});

// Save pattern into database
app.post('/pattern', function (req, res) {
  var pattern = require('./api/pattern');
  pattern.save(req, res);
});

// Get names of patterns
app.get('/pattern', function (req, res) {
  var pattern = require('./api/pattern');
  pattern.list(req, res);
});

// Get one pattern's cells by name
app.get('/pattern/:name', function (req, res) {
  var pattern = require('./api/pattern');
  pattern.get(req, res);
});

// Evolve
app.post('/evolve', function (req, res) {
  var gameOfLife = require('./components/game-of-life');
  res.send(gameOfLife(req.body.cells, req.body.size));
});


//-----------------------------------------------------------------------------
//  SERVER
//-----------------------------------------------------------------------------

// Start Express server
app.listen(config.api.port, function () {
  console.log('Game of Life API listening on port ' + config.api.port + '...')
});
