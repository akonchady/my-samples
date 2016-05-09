var http = require('http');
var port = 3000;

http.createServer(function(request, response) {
    response.writeHead({
       'Content-Type': 'text/plain'
    });
    response.end('Hello world!');
}).listen(port);
console.log('Server listening on port ' + port);