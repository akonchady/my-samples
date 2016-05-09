var express = require('express');

var app = express();
var port = 3002;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var petRoutes = require('./routes/pet.js')(app);

var server = app.listen(port, function() {
	console.log('Server running at port ' + port);
});