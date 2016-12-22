var invoice = require('../models/invoice');

module.exports = {
	index: function(req, res) {
		invoice.index(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	show: function(req, res) {
		invoice.show(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		invoice.create(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		invoice.update(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	delete: function(req, res) {
		invoice.delete(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.end();
		});	
	}	
}