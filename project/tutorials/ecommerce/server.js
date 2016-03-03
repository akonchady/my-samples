var express = require('express');
var morgan = require('morgan'); // to log requests in console

var app = express(),
    port = 3000;

// app.use is to run a Middleware
app.use(morgan('dev'));

app.get('/', function (req, res) {
    var name = 'Adarsh';
    res.json('My name is ' + name);
});

app.get('/catname', function (req, res) {
    res.json('batman');
});

app.listen(port, function (err) {
    if(err) throw err;
    console.log('Server is running on port ' + port);
});