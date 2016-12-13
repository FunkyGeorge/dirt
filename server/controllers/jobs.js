var job = require('../models/job');

module.exports = {
	index: function(req, res) {
		job.index(req, function(err, data) {
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
		job.show(req, function(err, data) {
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
		job.create(req, function(err, data) {
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
		job.update(req, function(err, data) {
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
		job.delete(req, function(err) {
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
