var express = require('express'),
	mongoose = require('mongoose'),
	mongodb = require('mongodb'),
	mongojs = require('mongojs'),
	ObjectId = require('mongodb').ObjectId,
	bodyParser = require('body-parser');

//models
var Checkin = require('./models/checkinModel');
var Checkout = require('./models/checkoutModel');
var Event = require('./models/eventModel');
var User = require('./models/userModel');
var Room = require('./models/roomModel');
var Sandwiche = require('./models/sandwicheModel');
var RoomName = require('./models/roomNameModel');

var config = require('./config.js');

var app = express();

var port = process.env.port || 3000;

app.set('superSecret', config.secret);
var secret = app.get('superSecret');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

appRouter = require('./Routes/appRoutes')(Checkin, Checkout, Event, User, Sandwiche, Room, RoomName, secret);

//var appRouter = express.Router();

app.use('/api', appRouter);

app.listen(port, function(){
	console.log('Gulp is running my app on port: ' + port);
});
