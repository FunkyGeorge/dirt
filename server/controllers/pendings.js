var pending = require('../models/pending');

module.exports = {
	index: function(req, res) {
		pending.index(req, function(err, data) {
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
		pending.show(req, function(err, data) {
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
		pending.create(req, function(err, data) {
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
		pending.update(req, function(err, data) {
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
		pending.delete(req, function(err) {
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