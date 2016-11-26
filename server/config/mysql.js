var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: '8889',
	user: 'root',
	password: 'root',
	database: 'shopdb'
});

connection.connect(function(err) {
	if (err)
		console.error('error connecting: ' + err.stack);
	else
		console.log('connected as id ' + connection.threadId);
});

module.exports = connection;