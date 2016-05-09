var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function authUser(req, res, next) {
	console.log('middleware authUser called');
	var user = {
		name: 'Adarsh',
		admin: true
	};

	req.user = user;
	next();
}

// app.use(authUser); -> This will apply to every request

app.get('/', function(request, response) {
	response.send({foo: 'bar'});
});

app.post('/doStuff', authUser, function(request, response) { // This middleware will be applied 
										// before processing the callback only for 'doStuff' request
	var param = request.body['foo'];

	response.send({
		foo: param,
		name: request.user.name,
		isAdmin: request.user.admin
	});
});

app.listen(3000);