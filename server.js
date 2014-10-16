
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

// model
	var Rx = mongoose.model('rx', {
		text : String
	});

// routes
	app.get('/api/rxs', function(req, res) {

		// use mongoose to get all rxs in the database
		Rx.find(function(err, rxs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(rxs); // return all todos in JSON format
		});
	});

	// create rx and send back all rxs after creation
	app.post('/api/rxs', function(req, res) {

		// create a rx, information comes from AJAX request from Angular
		Rx.create({
			text : req.body.text,
			done : false
		}, function(err, rx) {
			if (err)
				res.send(err);

			// get and return all the rxs after you create another
			Rx.find(function(err, rxs) {
				if (err)
					res.send(err)
				res.json(rxs);
			});
		});

	});

	// delete a todo
	app.delete('/api/rxs/:rx_id', function(req, res) {
		Rx.remove({
			_id : req.params.rx_id
		}, function(err, rx) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Rx.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(rxs);
			});
		});
	});

// app
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view
	});

// server
	app.listen(8080);
	console.log("App listening on port 8080, son! Check it!");
