var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	// index: function(req, callback) {
	// 	var query = "SELECT *, HEX(messages.id) AS id WHERE HEX(messages.id) = ? ORDER BY created_at DESC";
	// 	connection.query(query, function(err, data) {
	// 		if (err)
	// 			callback({errors: {database: {message: "Please contact an admin."}}});
	// 		else
	// 			callback(false, data)
	// 	});
	// },
	show: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "SELECT *, HEX(id) as id, HEX(user_id) as user_id, HEX(trucker_id) as trucker_id FROM messages \
					WHERE HEX(application_id) = ? AND ? IN (SELECT HEX(trucker_id) FROM applications WHERE \
					HEX(applications.id) = ?) ORDER BY created_at";
				else				
					query = "SELECT *, HEX(id) as id, HEX(user_id) as user_id, HEX(trucker_id) as trucker_id FROM messages \
					WHERE HEX(application_id) = ? AND ? IN (SELECT HEX(user_id) FROM applications LEFT JOIN jobs \
					ON job_id = jobs.id WHERE HEX(applications.id) = ?) ORDER BY created_at";
				connection.query(query, [req.params.id, data.id, req.params.id], function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false, data);
				});
			}			
		});
	},	
	create: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.message || !req.body.application_id)
				callback({errors: {message: {message: "Invalid message."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "INSERT INTO messages SET id = UNHEX(REPLACE(UUID(), '-', '')), message = ?, application_id = UNHEX(?), \
					trucker_id = UNHEX(?), created_at = NOW(), updated_at = NOW()";
				else
					query = "INSERT INTO messages SET id = UNHEX(REPLACE(UUID(), '-', '')), message = ?, application_id = UNHEX(?), \
					user_id = UNHEX(?), created_at = NOW(), updated_at = NOW()";
				connection.query(query, [req.body.message, req.body.application_id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
			}
		});
	},
	update: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.message)
				callback({errors: {message: {message: "Invalid message."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "UPDATE messages SET message = ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(trucker_id) = ? LIMIT 1";
				else
					query = "UPDATE messages SET message = ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
				connection.query(query, [req.body.message, req.params.id, data.id], function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
			}
		});
	},
	delete: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.message)
				callback({errors: {message: {message: "Invalid message."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "DELETE FROM messages WHERE HEX(id) = ? AND HEX(trucker_id) = ? LIMIT 1";
				else
					query = "DELETE FROM messages WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
			}
		});
	}
};