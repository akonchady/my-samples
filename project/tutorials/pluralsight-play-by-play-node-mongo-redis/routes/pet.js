var r = require('request').defaults({ json: true });

module.exports = function(app) {
	//Read
	app.get('/pets', function(req, res) {
		r({ uri: 'http://localhost:3001/dog'}, function(err, response, body) {
			if(!err && response.statusCode === 200) {
				res.json(body);
			}
			else {
				res.send(response.statusCode);
			}
		});

		// r({ uri: 'http://localhost:3001/cat'}, function(err, response, body) {
		// 	if(!err && response.statusCode === 200) {
		// 		res.json(body);
		// 	}
		// 	else {
		// 		res.send(response.statusCode);
		// 	}
		// });
	});
}