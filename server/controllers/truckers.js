var trucker = require('../models/trucker');

module.exports = {
	// index: function(req, res) {
	// 	trucker.index(function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// show: function(req, res) {
	// 	trucker.show(req, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	update: function(req, res) {
		trucker.update(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('token').cookie('token', data).end();
		});	
	},
	delete: function(req, res) {
		trucker.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('token').end();
		});	
	},
	register: function(req, res) {
		trucker.register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});
	},
	login: function(req, res) {
		trucker.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});	
	}	
}
