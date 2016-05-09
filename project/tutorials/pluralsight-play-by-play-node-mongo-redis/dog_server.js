var express = require('express');

var app = express();
var port = 3001;
var bodyParser = require('body-parser');

// Connect to mongo using mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var dogRoutes = require('./routes/dog.js')(app);

var server = app.listen(port, function() {
	console.log('Server running at port ' + port);
});