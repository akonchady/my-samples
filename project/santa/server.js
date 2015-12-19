var restify = require('restify');

function respond(req, res, next) {
    if(req.params.value && req.params.value.toLowerCase() === 'press') {
        res.send('Hey there !!! Well Done. Send me this message and roll up your sleeves for your next task, which is to unscramble |esnraydetraernyag|. Hint: 2 words');
    }
    else {
        res.send('Wrong answer !!! Please try again.');
    }
    next();
}

var server = restify.createServer();

server.get('/answer/:value', respond);
server.head('/answer/:value', respond);

server.get(/.*/, restify.serveStatic({
    directory: __dirname
}));

server.listen(9647, function() {
    console.log('%s listening at %s', server.name, server.url);
});