var connection = require('../config/mysql');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');
var stripe = require("stripe")(fs.readFileSync('keys/stripe_secret', 'utf8'));

module.exports = {
	index: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query;
				if ('truck_type' in data)
					query = "SELECT status, HEX(applications.id) AS id, HEX(job_id) AS job_id, applications.created_at \
					AS created_at, applications.updated_at AS updated_at, first_name, last_name, dirt_type, volume, \
					completion_date FROM applications LEFT JOIN jobs \
					ON job_id = jobs.id LEFT JOIN users ON user_id = users.id WHERE HEX(applications.trucker_id) = ? \
					AND status >= 0 ORDER BY applications.created_at DESC ";
				else
					query = "SELECT status, HEX(applications.id) AS id, HEX(job_id) AS job_id, applications.created_at \
					AS created_at, applications.updated_at AS updated_at, first_name, last_name, dirt_type, volume, \
					completion_date FROM applications LEFT JOIN jobs \
					ON job_id = jobs.id LEFT JOIN truckers ON applications.trucker_id = truckers.id WHERE HEX(user_id) = ? \
					AND status >= 0 ORDER BY jobs.created_at DESC, applications.created_at DESC ";
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
	// 	jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
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
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!('truck_type' in data))
				callback({errors: {job: {message: "Only truckers are allowed to accept jobs."}}});
			else {
				var query = "SELECT id FROM jobs WHERE HEX(id) = ? AND job_status = 0 LIMIT 1";
				connection.query(query, req.body.job_id, function(err, job) {
					if (err)
						callback({errors: {database: {message: "Error finding job."}}});
					else if (job.length == 0)
						callback({errors: {job: {message: "Could not find job, or job not available for application."}}});
					else
						connection.query("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))", function(err) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else {
								var query = "INSERT INTO applications SET id = @temp, status = 0, job_id = ?, \
								trucker_id = UNHEX(?), created_at = NOW(), updated_at = NOW()";
								connection.query(query, [job[0].id, data.id], function(err) {
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
			}
		});
	},
	accept: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				// First find valid job given application id:
				var query = "SELECT job_id FROM applications LEFT JOIN jobs ON job_id = jobs.id WHERE \
				HEX(applications.id) = ? AND HEX(user_id) = ? AND status = 0 LIMIT 1";
				connection.query(query, [req.params.id, data.id], function (err, application) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else if (!data)
						callback({errors: {application: {message: "Invalid application provided."}}});
					else {
						// Set this application status to 1:
						var query = "UPDATE applications SET status = 1, updated_at = NOW() WHERE HEX(id) = ? LIMIT 1";
						connection.query(query, req.params.id, function(err, result) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else if (result.changedRows != 1)
								callback({errors: {update: {message: "Could not find valid application to update."}}});
							else {
								// Set all other application statuses to -1:
								var query = "UPDATE applications SET status = -1, updated_at = NOW() WHERE job_id = ? AND status = 0";
								connection.query(query, application.job_id, function(err, result) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
									else {
										// Set job status to 1:
										var query = "UPDATE jobs SET job_status = 1, updated_at = NOW() WHERE id = ? LIMIT 1";
										connection.query(query, application.job_id, function(err, result) {
											if (err)
												callback({errors: {database: {message: "Please contact an admin."}}});
											else if (result.changedRows != 1)
												callback({errors: {update: {message: "Could not find valid job to update."}}});
											else
												callback(false);
										});
									}
								});
							}
						});
					}
				})
			}
		});
	},
	decline: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query = "SELECT 1 FROM applications LEFT JOIN jobs ON job_id = jobs.id WHERE \
				HEX(user_id) = ? AND HEX(applications.id) = ? AND status = 0 LIMIT 1";
				connection.query(query, [data.id, req.params.id], function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else if (!data)
						callback({errors: {application: {message: "Could not find valid application to update."}}});
					else {
						var query = "UPDATE applications SET status = -2, updated_at = NOW() WHERE HEX(id) = ? LIMIT 1";
						connection.query(query, req.params.id, function(err, result) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else if (result.changedRows != 1)
								callback({errors: {update: {message: "Could not update application."}}});
							else
								callback(false);
						});
					}
				});
			}
		});
	},	
	cancel: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query = "UPDATE applications SET status = -2, updated_at = NOW() WHERE HEX(id) = ? \
				AND HEX(trucker_id) = ? AND status = 0 LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err, result) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else if (result.changedRows != 1)
						callback({errors: {update: {message: "Could not find valid application to update."}}});
					else
						callback(false);
				});
			}
		});
	},
	forfeit: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				// Update application:
				var query = "UPDATE applications SET status = -2, updated_at = NOW() WHERE HEX(id) = ? \
				AND HEX(trucker_id) = ? AND status > 0 LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err, result) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else if (result.changedRows != 1)
						callback({errors: {update: {message: "Could not find valid application to update."}}});					
					else {
						var query = "SELECT job_id FROM applications WHERE HEX(id) = ? AND HEX(trucker_id) = ?  \
						AND status = -1 LIMIT 1";
						connection.query(query, [req.params.id, data.id], function(err, data) {

							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else if (!data)
								callback({errors: {update: {message: "Could not find valid job to update."}}});					
							else {
								// Update job:
								var query = "UPDATE jobs SET job_status = -1, updated_at = NOW() WHERE id = ? LIMIT 1";
								connection.query(query, data[0].job_id, function(err, result) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
									else if (result.changedRows != 1)
										callback({errors: {update: {message: "Could not update job status."}}});
									else
										callback(false);
								});		
							}
						});					
					}
				});
			}
		});
	},
	payLeadFee: function(req, callback) {
		jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query = "SELECT job_id FROM applications LEFT JOIN jobs on applications.job_id = jobs.id \
				WHERE HEX(applications.id) = ? AND HEX(trucker_id) = ? AND status = 1 LIMIT 1";
				connection.query(query, [req.params.id, data.id], function(err, application) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else if (!data)
						callback({errors: {update: {message: "Invalid application provided."}}});					
					else {
						console.log(req.body.id)
						stripe.charges.create({
							amount: 2500,
							currency: "usd",
							source: req.body.id,
							description: "$25.00 lead fee"
						}, function(err, charge) {
							if (err)
								callback({errors: {stripe: {message: err.message}}});
							else {
								var query = "UPDATE applications SET status = 2, updated_at = NOW() WHERE HEX(id) = ? \
								AND HEX(trucker_id) = ? AND status = 1 LIMIT 1"
								connection.query(query, [req.params.id, data.id], function(err, result) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
									else if (result.changedRows != 1)
										callback({errors: {update: {message: "Could not find valid application to update."}}});					
									else {
										var query = "UPDATE jobs SET job_status = 2, updated_at = NOW() WHERE id = ? LIMIT 1"
										connection.query(query, application[0].job_id, function(err, result) {
											if (err)
												callback({errors: {database: {message: "Please contact an admin."}}});
											else if (result.changedRows != 1)
												callback({errors: {update: {message: "Could not find valid application to update."}}});					
											else
												callback(false);
										});
									}
								});
							}
						});
					}
				});
			}
		});
	}
	// delete: function(req, callback) {
	// 	jwt.verify(req.cookies.ronin_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else
	// 			var query = "DELETE FROM applications WHERE HEX(id) = ? AND HEX(user_id) = ? LIMIT 1";
	// 			connection.query(query, [req.params.id, data.id], function(err) {
	// 				if (err)
	// 					callback({errors: {database: {message: "Please contact an admin."}}});
	// 				else
	// 					callback(false);
	// 			});
	// 	});
	// }
};