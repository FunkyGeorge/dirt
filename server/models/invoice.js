var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	index: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "SELECT *, HEX(jobs.id) AS id, invoices.created_at AS created_at FROM invoices LEFT JOIN jobs \
					ON job_id = jobs.id LEFT JOIN users ON user_id = users.id WHERE HEX(trucker_id) = ? \
					ORDER BY invoices.created_at DESC";
				else
					query = "SELECT *, HEX(jobs.id) AS id, invoices.created_at AS created_at FROM invoices LEFT JOIN jobs \
					ON job_id = jobs.id LEFT JOIN truckers ON trucker_id = truckers.id WHERE HEX(user_id) = ? \
					ORDER BY invoices.created_at DESC";
				connection.query(query, data.id, function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false, data)
				});
			}
		});
	},
	show: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "SELECT *, invoices.created_at AS created_at FROM invoices LEFT JOIN jobs \
					ON job_id = jobs.id WHERE HEX(trucker_id) = ? AND HEX(job_id) = ? LIMIT 1";
				else
					query = "SELECT *, invoices.created_at AS created_at FROM invoices LEFT JOIN jobs \
					ON job_id = jobs.id WHERE HEX(user_id) = ? AND HEX(job_id) = ? LIMIT 1";
				connection.query(query, [data.id, req.params.id], function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false, data[0]);
				});
			}
		});
	},	
	create: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!('truck_type' in data))
				callback({errors: {user_type: {message: "Only truckers can create invoices."}}});
			else if (!req.body.cost || !req.body.job_id)
				callback({errors: {form: {message: "Invalid details."}}});
			else {
				var data = {
					cost: req.body.cost,
					status: 0,
					notes: req.body.notes
				};
				var query = "INSERT INTO invoices SET ?, job_id = UNHEX(?), created_at = NOW(), updated_at = NOW()";
				connection.query(query, [data, req.body.job_id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);				
				});
			}
		});
	},
	update: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "UPDATE invoices SET status = ?, updated_at = NOW() WHERE HEX(trucker_id) = \
					(SELECT trucker_id FROM invoices LEFT JOIN jobs ON job_id = jobs.id WHERE HEX(trucker_id) = ? \
					AND HEX(job_id) = ? LIMIT 1) LIMIT 1";
				else
					query = "UPDATE invoices SET status = ?, updated_at = NOW() WHERE HEX(trucker_id) = \
					(SELECT trucker_id FROM invoices LEFT JOIN jobs ON job_id = jobs.id WHERE HEX(user_id) = ? \
					AND HEX(job_id) = ? LIMIT 1) LIMIT 1";
				connection.query(query, [req.body.status, data.id, req.params.id], function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
			}
		});
	},
	delete: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!('truck_type' in data))
				callback({errors: {user_type: {message: "Only truckers can delete invoices."}}});
			else {
				var query = "DELETE FROM invoices WHERE HEX(job_id) = (SELECT trucker_id FROM invoices LEFT JOIN jobs \
				ON job_id = jobs.id WHERE HEX(trucker_id) = ? AND HEX(job_id) = ? LIMIT 1) LIMIT 1";
				connection.query(query, [data.id, req.params.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);				
				});
			}
		});
	}	
};