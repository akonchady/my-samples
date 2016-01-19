var mongoose = require('mongoose/');
var restify = require('restify');

var config = require('./config');

var mongodbPort = process.env.PORT || 81;

/* 

 see README.md for a more detailed write up 
 */

////////////////////////////////////////////////////// MONGODB - saves data in the database and posts data to the browser

var mongoURI = ( process.env.PORT ) ? config.creds.mongoose_auth_mongohq : config.creds.mongoose_auth_local;
console.log('uri: ' + config.creds.mongoose_auth_local);
db = mongoose.connect(mongoURI),
    Schema = mongoose.Schema;

// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');

var mongodbServer = restify.createServer({
    formatters: {
        'application/json': function(req, res, body){
            if(req.params.callback){
                var callbackFunctionName = req.params.callback.replace(/[^A-Za-z0-9_\.]/g, '');
                return callbackFunctionName + "(" + JSON.stringify(body) + ");";
            } else {
                return JSON.stringify(body);
            }
        },
        'text/html': function(req, res, body){
            return body;
        }
    }
});

mongodbServer.use(restify.bodyParser());

// Create a schema for our data
var MessageSchema = new Schema({
    name: String,
    phone: String,
    message: String,
    attendsCeremony: Boolean,
    attendsReception: Boolean,
    date: Date
});

// Use the schema to register a model
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

// This function is responsible for returning all entries for the Message model
var getMessages = function(req, res, next) {
    // Resitify currently has a bug which doesn't allow you to set default headers
    // This headers comply with CORS and allow us to mongodbServer our response to any origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    console.log("mongodbServer getMessages");

    Message.find().limit(20).sort('date', -1).execFind(function (arr,data) {
        res.send(data);
    });
};

var postMessage = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // Create a new message model, fill it up and save it to Mongodb
    var message = new Message();

    console.log("mongodbServer postMessage: " + req.params.message);

    message.name = req.params.name;
    message.phone = req.params.phone;
    message.message = req.params.message;
    message.attendsCeremony = req.params['check-ceremony'] === 'on' ? true : false;
    message.attendsReception = req.params['check-reception'] === 'on' ? true : false;
    message.date = new Date();
    message.save(function () {
        res.send('success');
    });
};

mongodbServer.listen(mongodbPort, function() {

    var consoleMessage = '\n MongoDb, Mongoose, Restify, and Backbone Tutorial'
    consoleMessage += '\n +++++++++++++++++++++++++++++++++++++++++++++++++++++'
    consoleMessage += '\n\n %s your mongodbServer is listening at %s';
    consoleMessage += '\n\n open your browser to http://localhost:%s/messages \n\n';
    consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n\n'

    console.log(consoleMessage, mongodbServer.name, mongodbServer.url, mongodbPort);

});

mongodbServer.get('/rsvp58746', getMessages);
mongodbServer.post('/rsvp', postMessage);