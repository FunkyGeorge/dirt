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
				var sort;
				if (req.headers.flags[2])
					sort = "jobs.created_at"
				else {
					sort = "field(zip, )"; //change to distance
				}
				var limit = (req.headers.flags[0] * 5) + "";
				if ('truck_type' in data){
					query = `SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(contractor_id) \
					AS contractor_id, IF(UNHEX(?) IN (pendings.trucker_id), 1, 0) AS applied FROM jobs \
					LEFT JOIN pendings ON jobs.id = pendings.job_id ORDER BY ${sort} DESC \
					LIMIT ${limit}`;
				}
				else
					query = `SELECT *, HEX(jobs.id) AS id, jobs.created_at as created_at, HEX(contractor_id) \
					AS contractor_id FROM jobs ORDER BY ${sort} DESC \
					LIMIT ${limit}`;
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
				var _data;
				var query;
				if ('truck_type' in data) {
					_data = [data.id, req.params.id];
					query = "SELECT *, HEX(jobs.id) AS id, HEX(contractor_id) AS contractor_id, IF(UNHEX(?) \
					IN (pendings.trucker_id), 1, 0) AS applied FROM jobs LEFT JOIN pendings ON jobs.id = pendings.job_id \
					WHERE HEX(jobs.id) = ? LIMIT 1";
				}
				else {
					_data = req.params.id;
					query = "SELECT *, HEX(jobs.id) AS id, HEX(contractor_id) AS contractor_id FROM jobs \
					WHERE HEX(jobs.id) = ? LIMIT 1";
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
			else if ('truck_type' in data)
				callback({errors: {user_type: {message: "Only contractors can create jobs."}}});
			else if (!req.body.amount || req.body.amount <= 0 || !req.body.completion_date || !req.body.type ||
			req.body.pickup_only === undefined || req.body.loader_onsite === undefined)
				callback({errors: {form: {message: "Invalid details."}}});
			else
				connection.query("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))", function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else {
						var _data = {
							amount: req.body.amount,
							completion_date: req.body.completion_date,
							type: req.body.type,
							pickup_only: req.body.pickup_only,
							loader_onsite: req.body.loader_onsite,
							address: req.body.address,
							city: req.body.city,
							zip: req.body.zip
						};
						connection.query("INSERT INTO jobs SET ?, id = @temp, contractor_id = UNHEX(?), \
						created_at = NOW(), updated_at = NOW()", [_data, data.id], function(err) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else
								connection.query("SELECT HEX(@temp) AS id", function(err, data) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
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
					type: req.body.type,
					pickup_only: req.body.pickup_only,
					loader_onsite: req.body.loader_onsite,
					address: req.body.address,
					city: req.body.city,
					zip: req.body.zip
				};
				var query = "UPDATE jobs SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
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
				var query = "DELETE FROM jobs WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	}
};
