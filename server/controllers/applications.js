var application = require('../models/application');

module.exports = {
	index: function(req, res) {
		application.index(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	// show: function(req, res) {
	// 	application.show(req, function(err, data) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	create: function(req, res) {
		application.create(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		application.update(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	delete: function(req, res) {
		application.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.end();
		});	
	}
}