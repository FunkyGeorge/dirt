var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	index: function(callback) {
		var query = "SELECT *, HEX(jobs.id) AS id, jobs.created_at as created_at, HEX(contractor_id) \
		AS contractor_id FROM jobs LEFT JOIN images ON jobs.id = job_id ORDER BY jobs.created_at DESC";
		connection.query(query, function(err, data) {
			console.log(data)
			if (err)
				callback({errors: {database: {message: `Database error: ${err.code}.`}}});
			else
				callback(false, data)
		});
	},
	show: function(req, callback) {
		var query = "SELECT *, HEX(jobs.id) AS id, HEX(contractor_id) AS contractor_id FROM jobs \
		LEFT JOIN images ON jobs.id = job_id WHERE HEX(jobs.id) = ? LIMIT 1";
		connection.query(query, req.params.id, function(err, data) {
			if (err)
				callback({errors: {database: {message: `Database error: ${err.code}.`}}});
			else
				callback(false, data[0]);
		});
	},	
	create: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.amount | req.body.amount <= 0 | !req.body.completion_date)
				callback({errors: {form: {message: "Invalid details."}}});
			else
				connection.query("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))", function(err) {
					if (err)
						callback({errors: {database: {message: `Database error: ${err.code}.`}}});
					else {
						var _data = {
							amount: req.body.amount,
							completion_date: req.body.completion_date,
							description: req.body.description,
							pickup_only: req.body.pickup_only,
							loader_onsite: req.body.loader_onsite,
							address: req.body.address,
							city: req.body.city,
							zip: req.body.zip
						};
						connection.query("INSERT INTO jobs SET ?, id = @temp, contractor_id = UNHEX(?), \
						created_at = NOW(), updated_at = NOW()", [_data, data.id], function(err) {
							if (err)
								callback({errors: {database: {message: `Database error: ${err.code}.`}}});
							else
								connection.query("SELECT HEX(@temp) AS id", function(err, data) {
									if (err)
										callback({errors: {database: {message: `Database error: ${err.code}.`}}});
									else
										callback(false, data[0]);
								});
						});
					}				
				});
		});
	},
	update: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var _data = {
					amount: req.body.amount,
					completion_date: req.body.completion_date,
					description: req.body.description,
					pickup_only: req.body.pickup_only,
					loader_onsite: req.body.loader_onsite,
					address: req.body.address,
					city: req.body.city,
					zip: req.body.zip
				}
				var query = "UPDATE jobs SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
				connection.query(query, [_data, req.params.id, data.id], function(err, data) {
					if (err)
						callback({errors: {database: {message: `Database error: ${err.code}.`}}});
					else {
						console.log(this.sql)
						callback(false);
					}
				});
			}
		});
	},
	delete: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else
				var query = "DELETE FROM jobs WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: `Database error: ${err.code}.`}}});
					else
						callback(false);
				});
		});
	}
};