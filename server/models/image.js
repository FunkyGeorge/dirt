var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	// index: function(callback) {
	// 	connection.query("SELECT *, HEX(id) AS id, HEX(job_id) AS job_id FROM images", function(err, data) {
	// 		if (err)
	// 			callback({errors: {database: {message: "Please contact an admin."}}});
	// 		else
	// 			callback(false, data)
	// 	});
	// },
	// show: function(req, callback) {
	// 	var query = "SELECT *, HEX(id) AS id, HEX(job_id) AS job_id FROM images WHERE HEX(id) = ? LIMI 1";
	// 	connection.query(query, req.params.id, function(err, data) {
	// 		if (err)
	// 			callback({errors: {database: {message: "Please contact an admin."}}});
	// 		else
	// 			callback(false, data);
	// 	});
	// },	
	create: function(req, callback) {
		if (!req.body.uri | !req.body.job_id)
			callback({errors: {form: {message: "URI not provided."}}});
		else {
			connection.query("INSERT INTO images SET id = UNHEX(REPLACE(UUID(), '-', '')), uri = ?, \
			job_id = UNHEX(?), created_at = NOW(), updated_at = NOW()", [req.body.uri, req.body.job_id], function(err) {
				if (err)
					callback({errors: {database: {message: "Please contact an admin."}}});
				else
					callback(false);				
			});
		}
	},
	// update: function(req, callback) {
	// 	jwt.verify(req.cookies.token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else {
	// 			var _data = {
	// 				amount: req.body.amount,
	// 				completion_date: req.body.completion_date,
	// 				description: req.body.description,
	// 				pickup_only: req.body.pickup_only,
	// 				address: req.body.address,
	// 				city: req.body.city,
	// 				zip: req.body.zip
	// 			}
	// 			var query = "UPDATE images SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(job_id) = ? LIMIT 1";
	// 			connection.query(query, [_data, req.params.id, data.id], function(err, data) {
	// 				if (err)
	// 					callback({errors: {database: {message: "Please contact an admin."}}});
	// 				else
	// 					callback(false);
	// 			});
	// 		}
	// 	});
	// },
	delete: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else
				var query = "DELETE FROM images WHERE images.id = \
				(SELECT images.id FROM contractors LEFT JOIN jobs \
				ON contractors.id = contractor_id LEFT JOIN images ON jobs.id = job_id \
				WHERE HEX(contractors.id) = ? AND HEX(images.id) = ? LIMIT 1) LIMIT 1";
				connection.query(query, [data.id, req.params.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	}
};