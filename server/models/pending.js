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
					query = "SELECT HEX(pendings.id) AS id, pendings.created_at AS created_at, first_name, last_name, \
					completion_date FROM pendings LEFT JOIN jobs ON job_id = jobs.id LEFT JOIN contractors ON \
					contractor_id = contractors.id WHERE HEX(pendings.trucker_id) = ? ORDER BY pendings.created_at DESC";
				else
					query = "SELECT HEX(pendings.id) AS id, pendings.created_at AS created_at, first_name, last_name, \
					completion_date FROM pendings LEFT JOIN contractors ON contractor_id = contractors.id WHERE \
					HEX(contractors.id) = ? ORDER BY pendings.created_at DESC";
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
				var _data;
				if ('truck_type' in data) {
					_data = [data.id, req.params.id];
					query = "SELECT *, HEX(pendings.id) AS id, HEX(contractor_id) AS contractor_id, IF(UNHEX(?) \
					IN (pendings.trucker_id), 1, 0) AS accepted FROM pendings LEFT JOIN images ON pendings.id = pending_id \
					LEFT JOIN pendings ON pendings.id = pendings.pending_id WHERE HEX(pendings.id) = ? LIMIT 1";
				}
				else {
					_data = req.params.id;
					query = "SELECT *, HEX(pendings.id) AS id, HEX(contractor_id) AS contractor_id FROM pendings \
					LEFT JOIN images ON pendings.id = pending_id WHERE HEX(pendings.id) = ? LIMIT 1";
				}
				connection.query(query, _data, function(err, data) {
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
			else if (!req.body.job_id | !('truck_type' in data))
				callback({errors: {job: {message: "Either the job id was not provided, or you're not allowed to accept jobs."}}});
			else {
				var query = "INSERT INTO pendings SET job_id = UNHEX(?), trucker_id = UNHEX(?), \
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
					amount: req.body.amount,
					completion_date: req.body.completion_date,
					description: req.body.description,
					pickup_only: req.body.pickup_only,
					loader_onsite: req.body.loader_onsite,
					address: req.body.address,
					city: req.body.city,
					zip: req.body.zip
				}
				var query = "UPDATE pendings SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
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
				var query = "DELETE FROM pendings WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	}
};