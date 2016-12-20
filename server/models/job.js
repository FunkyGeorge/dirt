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
				if (req.headers.sort == "true")
					sort = "jobs.created_at DESC"
				else {
					sort = `field(zip, ${req.headers.zips})`; //change to distance
				}
				var limit = (req.headers.scroll * 5) + "";
				if ('truck_type' in data){
					query = `SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(user_id) \
					AS user_id, IF(UNHEX(?) IN (applications.trucker_id), 1, 0) AS applied FROM jobs \
					LEFT JOIN pickup ON jobs.id = pickup.job_id LEFT JOIN dropoff ON jobs.id = dropoff.job_id \
					LEFT JOIN applications ON jobs.id = applications.job_id ORDER BY ${sort} LIMIT ${limit}`;
				}
				else
					query = `SELECT *, HEX(jobs.id) AS id, jobs.created_at AS created_at, HEX(user_id) \
					AS user_id FROM jobs LEFT JOIN pickup ON jobs.id = pickup.job_id LEFT JOIN dropoff \
					ON jobs.id = dropoff.job_id ORDER BY ${sort} LIMIT ${limit}`;
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
			else if (req.body.job_type === undefined || !(req.body.job_type == 0 || req.body.job_type == 1 || req.body.job_type == 2))
				callback({errors: {check: {message: "Job type is invalid or wasn't provided."}}});
			else if (!req.body.dirt_type)
				callback({errors: {dirt_type: {message: "Dirt type is required."}}});
			else if (!req.body.volume || req.body.volume <= 0)
				callback({errors: {volume: {message: "You must submit a volume that is greater than 0."}}});
			else if (!req.body.completion_date)
				callback({errors: {completion_date: {message: "Completion date is required."}}});
			else if ((req.body.job_type == 0 || req.body.job_type == 2) && (!req.body.p_address || !req.body.p_city ||
			!req.body.p_state || !req.body.p_zip || req.body.p_loader === undefined))
				callback({errors: {pickup: {message: "Missing details for pick-up location."}}});
			else if ((req.body.job_type == 1 || req.body.job_type == 2) && (!req.body.d_address || !req.body.d_city ||
			!req.body.d_state || !req.body.d_zip || req.body.d_loader === undefined))
				callback({errors: {dropoff: {message: "Missing address details for drop-off location."}}});
			else
				connection.query("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))", function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else {
						var _data = {
							job_type: req.body.job_type,
							dirt_type: req.body.dirt_type,
							volume: req.body.volume,
							completion_date: req.body.completion_date
						};
						var query = "INSERT INTO jobs SET ?, id = @temp, user_id = UNHEX(?), \
						created_at = NOW(), updated_at = NOW()";
						connection.query(query, [_data, data.id], function(err) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else {
								if (req.body.job_type == 0 || req.body.job_type == 2) {
									var data = {
										p_address: req.body.p_address,
										p_city: req.body.p_city,
										p_state: req.body.p_state,
										p_zip: req.body.p_zip,
										p_loader: req.body.p_loader
									};
									connection.query("INSERT INTO pickup SET ?, job_id = @temp", data, function(err) {
										if (err) {
											callback({errors: {database: {message: "Please contact an admin."}}});
											return;
										}
									});
								}
								if (req.body.job_type == 1 || req.body.job_type == 2) {
									var data = {
										d_address: req.body.d_address,
										d_city: req.body.d_city,
										d_state: req.body.d_state,
										d_zip: req.body.d_zip,
										d_loader: req.body.d_loader
									};
									connection.query("INSERT INTO dropoff SET ?, job_id = @temp", data, function(err) {
										if (err) {
											callback({errors: {database: {message: "Please contact an admin."}}});
											return;
										}
									});
								}
								connection.query("SELECT HEX(@temp) AS id", function(err, data) {
									if (err) {
										callback({errors: {database: {message: "Please contact an admin."}}});
										return;
									}
									else
										callback(false, data[0]);
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
					job_type: req.body.job_type,
					dirt_type: req.body.dirt_type,
					volume: req.body.volume,
					completion_date: req.body.completion_date,
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
