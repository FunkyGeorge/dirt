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
					query = "SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(user_id) \
					AS user_id, IF(UNHEX(?) IN (applications.trucker_id), 1, 0) AS applied FROM jobs \
					LEFT JOIN pickup ON jobs.id = pickup.job_id LEFT JOIN dropoff ON jobs.id = dropoff.job_id \
					LEFT JOIN applications ON jobs.id = applications.job_id ORDER BY jobs.created_at DESC";
				else
					query = "SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(user_id) \
					AS user_id FROM jobs LEFT JOIN pickup ON jobs.id = pickup.job_id LEFT JOIN dropoff \
					ON jobs.id = dropoff.job_id ORDER BY jobs.created_at DESC";
				connection.query(query, data.id, function(err, data) {
					console.log(data)
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
					query = "SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(user_id) \
					AS user_id, IF(UNHEX(?) IN (applications.trucker_id), 1, 0) AS applied FROM jobs \
					LEFT JOIN pickup ON jobs.id = pickup.job_id LEFT JOIN dropoff ON jobs.id = dropoff.job_id \
					LEFT JOIN applications ON jobs.id = applications.job_id WHERE HEX(jobs.id) = ? LIMIT 1";
				}
				else {
					_data = req.params.id;
					query = "SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(user_id) \
					AS user_id FROM jobs LEFT JOIN pickup ON jobs.id = pickup.job_id LEFT JOIN dropoff \
					ON jobs.id = dropoff.job_id WHERE HEX(jobs.id) = ? LIMIT 1";
				}
				connection.query(query, _data, function(err, data) {
					console.log(data)
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
				callback({errors: {user_type: {message: "Only users can create jobs."}}});
			else if (!req.body.job || (!req.body.pickup && !req.body.dropoff))
				callback({errors: {form: {message: "Invalid details submitted."}}});
			else if (!req.body.job.volume || req.body.job.volume <= 0)
				callback({errors: {volume: {message: "You must submit a volume that is greater than 0."}}});
			else if (!req.body.job.completion_date)
				callback({errors: {completion_date: {message: "Completion date is required."}}});			
			else if (!req.body.job.dirt_type)
				callback({errors: {dirt_type: {message: "Dirt type is required."}}});
			else if (req.body.job.pickup_only === undefined || req.body.job.need_only === undefined || req.body.job.loader_pickup === undefined ||
			req.body.job.loader_dropoff === undefined)
				callback({errors: {form: {message: "Missing job details."}}});
			else if (!req.body.pickup.address || !req.body.pickup.city || !req.body.pickup.state || !req.body.pickup.zip)
				callback({errors: {form: {message: "Missing address details for pick-up location."}}});
			else if (req.body.dropoff && (!req.body.dropoff.address || !req.body.dropoff.city || !req.body.dropoff.state || !req.body.dropoff.zip))
				callback({errors: {form: {message: "Missing address details for drop-off location."}}});
			else
				connection.query("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))", function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else {
						var _data = {
							volume: req.body.job.volume,
							completion_date: req.body.job.completion_date,
							dirt_type: req.body.job.dirt_type,
							pickup_only: req.body.job.pickup_only,
							loader_pickup: req.body.job.loader_pickup,
							loader_dropoff: req.body.job.loader_dropoff
						};
						var query = "INSERT INTO jobs SET ?, id = @temp, user_id = UNHEX(?), \
						created_at = NOW(), updated_at = NOW()";
						connection.query(query, [_data, data.id], function(err) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else {
								var data = {
									address: req.body.pickup.address,
									city: req.body.pickup.city,
									state: req.body.pickup.state,
									zip: req.body.pickup.zip
								};
								var query = "INSERT INTO pickup SET ?, job_id = @temp, created_at = NOW(), updated_at = NOW()";
								connection.query(query, data, function(err) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
									else if (!req.body.job.pickup_only && req.body.dropoff) {
										var data = {
											address: req.body.dropoff.address,
											city: req.body.dropoff.city,
											state: req.body.dropoff.state,
											zip: req.body.dropoff.zip
										};
										var query = "INSERT INTO dropoff SET ?, job_id = @temp, created_at = NOW(), updated_at = NOW()";
										connection.query(query, data, function(err) {
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
					volume: req.body.volume,
					completion_date: req.body.completion_date,
					dirt_type: req.body.dirt_type,
					pickup_only: req.body.pickup_only,
					loader_pickup: req.body.loader_pickup,
					loader_dropoff: req.body.loader_dropoff
				};
				var query = "UPDATE jobs SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
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
				var query = "DELETE FROM jobs WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	}
};