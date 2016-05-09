var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function(app) {

	function errorHandler(msg, err) {
		res.json({
					info: msg,
					error: err
				});
	}
	//Create
	app.post('/cat', function(req, res) {
		var newCat = new Cat(req.body);

		newCat.save(function(err) {
			if(err) {
				res.json({
					info: 'Error during cat creation',
					error: err
				});
			}
			res.json({
				info: 'Cat created successfully'
			});
		});
	});

	// Read
	app.get('/cat', function(req, res) {
		Cat.find(function(err, cats) {
			if(err) {
				res.json({
					info: 'Error during cat find',
					error: err
				
				});
			}
			res.json({
				info: 'Cats found successfully', 
				data: cats
			});
		});
	});
	

	// Read - find by id
	app.get('/cat/:id', function(req, res) {
		Cat.findById(req.params.id, function(err, cat) {
			if(err) {
				res.json({
					info: 'Error during find cat by id', 
					error: err
				});
			}
			if(cat) {
				res.json({
					info: 'Cat found by id', 
					data: cat
				});
			}
			else {
				res.json({
					info: 'Cat not found'
				});
			}
		});
	});	

	// Update
	app.put('/cat/:id', function(req, res) {

		Cat.findById(req.params.id, function(err, cat) {
			if(err) {
				res.json({
					info: 'Error during find cat', 
					error: err
				});
			}
			if(cat) {
				_.merge(cat, req.body);
				cat.save(function(err) {
					if(err) {
						res.json({
							info: 'Error during updating cat', 
							error: err
						});
					}
					res.json('Cat updated successfully');
				});
			}
		});
	});


	// Delete
	app.delete('/cat/:id', function(req, res) {
		Cat.findByIdAndRemove(req.params.id, function(err, cat) {
			if(err) {
				res.json({
					info: 'Error during removing cat', 
					error: err
				});
			}
			res.json({
				info: 'Cat removed successfully'
			});
		});
	});
}