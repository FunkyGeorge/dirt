var application = require('../models/application');

module.exports = {
	index: function(req, res) {
		application.index(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
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
	// 				res.clearCookie('ronin_token').json(err);
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
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	accept: function(req, res) {
		application.accept(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	decline: function(req, res) {
		application.decline(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},	
	cancel: function(req, res) {
		application.cancel(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	forfeit: function(req, res) {
		application.forfeit(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	invoice: function(req, res) {
		application.invoice(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	payLeadFee: function(req, res) {
		application.payLeadFee(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	payInvoice: function(req, res) {
		application.payInvoice(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('ronin_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	},
	// delete: function(req, res) {
	// 	application.delete(req, function(err) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('ronin_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.end();
	// 	});	
	// }
}