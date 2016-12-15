var connection = require('../config/mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	// index: function(callback) {
	// 	connection.query("SELECT *, HEX(id) AS id FROM users", function(err, data) {
	// 		if (err)
	// 			callback({errors: {database: {message: "Please contact an admin."}}})
	// 		else
	// 			callback(false, data)
	// 	});
	// },
	// show: function(req, callback) {
	// 	var data = {};
	// 	var username = req.params.username;

	// 	// Get posts:
	// 	var query = "SELECT * FROM posts LEFT JOIN users ON user_id = users.id WHERE username = ?";
	// 	connection.query(query, username, function(err, posts) {
	// 		if (err) {
	// 			callback(err);
	// 			return;
	// 		}
	// 		data.posts = posts;
	// 	});

	// 	// Get favorites:
	// 	var query = "SELECT * FROM favorites LEFT JOIN users ON user_id = users.id \
	// 	LEFT JOIN posts ON post_id = posts.id WHERE username = ?";
	// 	connection.query(query, username, function(err, favorites) {
	// 		if (err) {
	// 			callback(err);
	// 			return;
	// 		}
	// 		data.favorites = favorites;
	// 	});

	// 	callback(false, data)
	// },	
	update: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query = "UPDATE truckers SET ? WHERE HEX(id) = ? LIMIT 1";
				connection.query(query, [req.body, data.id], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else {
						// Retrieve updated trucker:
						var query = "SELECT *, HEX(id) AS id FROM truckers WHERE HEX(id) = ? LIMIT 1";
						connection.query(query, data.id, function(err, data) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}})
							else {
								var token = jwt.sign({
									id: data[0].id,
									email: data[0].email,
									first_name: data[0].first_name,
									last_name: data[0].last_name,
									truck_type: data[0].truck_type									
								}, jwt_key);
								callback(false, token);												
							}
						});						
					}
				});
			}
		});
	},
	delete: function(req, callback) {
		jwt.verify(req.cookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else
				connection.query("DELETE FROM truckers WHERE HEX(id) = ? LIMIT 1", data.id, function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
		});
	},
	register: function(req, callback) {
		if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password 
		|| !req.body.confirm_password || !req.body.truck_type) 
			callback({errors: {form : {message: "All form fields are required."}}});
		else {
			// Check for unique email:
			var query = "SELECT email FROM truckers WHERE email = ? LIMIT 1";
			connection.query(query, req.body.email, function(err, data) {
				if (err)
					callback({errors: {database: {message: "Please contact an admin."}}})
				// If email already exists:
				else if (data.length > 0) 
					callback({errors: {email: {message: "Email already in use, please log in."}}});
				// Validate first_name:
				else if (!/^[a-z]{2,32}$/i.test(req.body.first_name)) 
					callback({errors: {first_name : {message: "First name must contain only letters."}}});
				// Validate last_name:
				else if (!/^[a-z]{2,32}$/i.test(req.body.last_name)) 
					callback({errors: {last_name : {message: "Last name must contain only letters."}}});
				// Validate email:
				else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email))
					callback({errors: {email : {message: "Invalid email. Email format should be: email@mailserver.com."}}});
				// Validate password:
				else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
					callback({errors: {password : {message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number."}}});
				// Validate confirm_password:
				else if (req.body.password != req.body.confirm_password)
					callback({errors: {confirm_password: {message: "Passwords do not match."}}});
				// Else valid new trucker:
				else
					// Encrypt password and save:
					bcrypt.genSalt(10, function(err, salt) {
						if (err)
							callback({errors: {salt: {message: "Salt error."}}})
						else
							bcrypt.hash(req.body.password, salt, function(err, hash) {
								if (err)
									callback({errors: {hash: {message: "Hash error."}}})
								else {
									var data = {
										email: req.body.email,
										first_name: req.body.first_name,
										last_name: req.body.last_name,
										truck_type: req.body.truck_type,
										password: hash
									};
									connection.query("INSERT INTO truckers SET ?, id = UNHEX(REPLACE(UUID(), '-', '')), \
									created_at = NOW(), updated_at = NOW()", data, function(err) {
										if (err)
											callback({errors: {database: {message: "Please contact an admin."}}})
										else {
											// Retrieve new trucker:
											var query = "SELECT *, HEX(id) AS id FROM truckers WHERE email = ? LIMIT 1";
											connection.query(query, req.body.email, function(err, data) {
												if (err)
													callback({errors: {database: {message: "Please contact an admin."}}})
												else {
													var token = jwt.sign({
														id: data[0].id,
														email: data[0].email,
														first_name: data[0].first_name,
														last_name: data[0].last_name,
														truck_type: data[0].truck_type
													}, jwt_key);
													callback(false, token);												
												}
											});
										}
									});
								}
							});
					});						
			});
		}
	},	
	login: function(req, callback) {
		// Validate login data:
		if (!req.body.email || !req.body.password)
			callback({errors: {login: {message: "All form fields are required."}}});
		else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
			callback({errors: {password: {message: "Invalid password."}}});		
		else {
			// Get trucker by email:
			var query = "SELECT *, HEX(id) AS id FROM truckers WHERE email = ? LIMIT 1";
			connection.query(query, req.body.email, function(err, data) {
				if (err)
					callback({errors: {database: {message: "Please contact an admin."}}});
				else if (data.length == 0)
					callback({errors: {email: {message: "Email does not exist, please register."}}});
				else
					// Check valid password:
					bcrypt.compare(req.body.password, data[0].password, function(err, isMatch) {
						if (err)
							callback({errors: {bcrypt: {message: "Invalid email/password, try facebook login."}}});
						else if (!isMatch)
							callback({errors: {password: {message: "Email/password does not match."}}});
						else {
							var token = jwt.sign({
								id: data[0].id,
								email: data[0].email,
								first_name: data[0].first_name,
								last_name: data[0].last_name,
								truck_type: data[0].truck_type
							}, jwt_key);
							callback(false, token);								
						}
					});					
			});
		}
	}
};