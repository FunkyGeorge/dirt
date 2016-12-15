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
					query = "SELECT HEX(applications.id) AS id, applications.created_at AS created_at, first_name, last_name, \
					HEX(jobs.id) AS job_id, completion_date FROM applications LEFT JOIN jobs ON job_id = jobs.id LEFT JOIN users \
					ON user_id = users.id WHERE HEX(applications.trucker_id) = ? ORDER BY applications.created_at DESC";
				else
					query = "SELECT HEX(applications.id) AS id, applications.created_at AS created_at, first_name, last_name, \
					completion_date FROM applications LEFT JOIN jobs ON job_id = jobs.id LEFT JOIN truckers ON \
					applications.trucker_id = truckers.id WHERE HEX(user_id) = ? ORDER BY applications.created_at DESC";
				connection.query(query, data.id, function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false, data)
				});
			}
		});
	},
	// show: function(req, callback) {
	// 	jwt.verify(req.cookies.token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else {
	// 			var query;
	// 			var _data;
	// 			if ('truck_type' in data) {
	// 				_data = [data.id, req.params.id];
	// 				query = "SELECT *, HEX(applications.id) AS id, HEX(user_id) AS user_id, IF(UNHEX(?) \
	// 				IN (applications.trucker_id), 1, 0) AS accepted FROM applications LEFT JOIN images ON applications.id = application_id \
	// 				LEFT JOIN applications ON applications.id = applications.application_id WHERE HEX(applications.id) = ? LIMIT 1";
	// 			}
	// 			else {
	// 				_data = req.params.id;
	// 				query = "SELECT *, HEX(applications.id) AS id, HEX(user_id) AS user_id FROM applications \
	// 				LEFT JOIN images ON applications.id = application_id WHERE HEX(applications.id) = ? LIMIT 1";
	// 			}
	// 			connection.query(query, _data, function(err, data) {
	// 				if (err)
	// 					callback({errors: {database: {message: "Please contact an admin."}}});
	// 				else
	// 					callback(false, data[0]);
	// 			});
	// 		}
	// 	});
	// },	
	create: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.job_id || !('truck_type' in data))
				callback({errors: {job: {message: "Either a bad job was provided, or you're not allowed to accept jobs."}}});
			else {
				var query = "INSERT INTO applications SET job_id = UNHEX(?), trucker_id = UNHEX(?), \
				id =  UNHEX(REPLACE(UUID(), '-', '')), created_at = NOW(), updated_at = NOW()"
				connection.query(query, [req.body.job_id, data.id], function(err) {
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
				var _data = {

				};
				var query = "UPDATE applications SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
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
				var query = "DELETE FROM applications WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	}
};