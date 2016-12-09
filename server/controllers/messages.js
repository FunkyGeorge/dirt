var message = require('../models/message');

module.exports = {
	index: function(req, res) {
		message.index(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	show: function(req, res) {
		message.show(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		message.create(req, function(err, data) {
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
		message.update(req, function(err, data) {
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
		message.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	}
}