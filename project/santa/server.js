var restify = require('restify');

function respond(req, res, next) {
    if(req.params.value && req.params.value.toLowerCase() === 'press') {
        res.send('Hey there !!! Well Done. Your secret key is pikachu');
    }
    else {
        res.send('Error');
    }
    next();
}

var server = restify.createServer();

server.get('/answer/:value', respond);
server.head('/answer/:value', respond);

server.get(/.*/, restify.serveStatic({
    directory: __dirname
}));

server.listen(8081, function() {
    console.log('%s listening at %s', server.name, server.url);
});