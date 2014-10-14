
// setup
	var express  = require('express');
	var app      = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');

// config
	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

//model
	var Rx = mongoose.model('Rx', {
		text : String
	});

//server
	app.listen(8080);
	console.log("App listening on port 8080");
