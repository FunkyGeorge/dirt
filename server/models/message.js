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
		var query = "SELECT * FROM messages WHERE HEX(pending_id) = ? ORDER BY created_at";
		connection.query(query, req.params.id, function(err, data) {
			if (err)
				callback({errors: {database: {message: "Please contact an admin."}}});
			else
				callback(false, data);
		});
	},	
	create: function(req, callback) {
		if (req.body.sender == undefined | !req.body.message | !req.body.pending_id)
			callback({errors: {message: {message: "Invalid message."}}});
		else {
			var data = {
				sender: req.body.sender,
				message: req.body.message
			};
			var query = "INSERT INTO messages SET ?, pending_id = UNHEX(?), id = UNHEX(REPLACE(UUID(), '-', '')), \
			created_at = NOW(), updated_at = NOW()";
			connection.query(query, [data, req.body.pending_id], function(err) {
				console.log(this.sql, err);
				if (err)
					callback({errors: {database: {message: "Please contact an admin."}}});
				else
					callback(false);
				// else {
				// 	var query = "SELECT * FROM messages WHERE HEX(pending_id) = ? ORDER BY created_at";
				// 	connection.query(query, req.body.pending_id, function(err, data) {
				// 		if (err)
				// 			callback({errors: {database: {message: "Please contact an admin."}}});
				// 		else
				// 			callback(false, data);
				// 	});
				// }
			});
		}
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
				var query = "UPDATE messages SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
				connection.query(query, [_data, req.params.id, data.id], function(err, data) {
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
			else
				var query = "DELETE FROM messages WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	}
};