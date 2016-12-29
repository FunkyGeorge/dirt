var user = require('../models/user');

module.exports = {
	// index: function(req, res) {
	// 	user.index(function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	show: function(req, res) {
		user.show(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		user.update(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('ronin_token').cookie('ronin_token', data).end();
		});
	},
	delete: function(req, res) {
		user.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('ronin_token').end();
		});
	},
	register: function(req, res) {
		user.register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('ronin_token', data).end();
		});
	},
	login: function(req, res) {
		user.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('ronin_token', data).end();
		});
	}
}
