// this is the main entry point for the node application

// modules =====================================================================
var express = require('express');
var app = express(); // create our app w/ express

var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console
var bodyparser = require('body-parser'); // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT
var database = require('./config/database'); // sets up the database url

// Port
var port = process.env.PORT || 3000;


// configuration ================================================================
mongoose.connect(database.url); // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyparser.json()); // parse application/json
app.use(bodyparser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyparser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// load the routes
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);