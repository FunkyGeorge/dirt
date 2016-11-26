console.log("here")
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
		console.error('Error connecting: ' + err.stack);
	else
		console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;

// var mongoose = require('mongoose'),
// fs = require('fs'),
// path = require('path'),
// models_path = path.join( __dirname, "../models"),
// reg = new RegExp( ".js$", "i" ),
// dbURI = 'mongodb://localhost/shopdb';

// mongoose.Promise = global.Promise;
// mongoose.connect( dbURI );
// mongoose.connection.on( 'connected', function () {
// 	console.log( `Mongoose default connection open to ${ dbURI }` );
// });
// mongoose.connection.on( 'error', function ( err ) {
// 	console.error( `Mongoose default connection error: ${ err }` );
// });
// mongoose.connection.on( 'disconnected', function () {
// 	console.log( 'Mongoose default connection disconnected' );
// });

// process.on( 'SIGINT', function() {
// 	mongoose.connection.close( function () {
// 		console.log( 'Mongoose default connection disconnected through app termination' );
// 		process.exit( 0 );
// 	});
// });

// fs.readdirSync( models_path ).forEach( function( file ) {
// 	if( reg.test( file ) ) {
// 		require( path.join( models_path, file ) );
// 	}
// });