module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {			
		socket.on('subscribe', function(application_id) {
			socket.join(application_id);
		});

		socket.on('send', function(data) {
			io.to(data.application_id).emit('sent', data);
		});

		//////////////////////////////////////////////////////
		//										SENT FROM TRUCKERS
		//////////////////////////////////////////////////////		
		socket.on('apply', function(data) {
			socket.join(data.application_id);
			socket.broadcast.emit('applied', data);
		});

		socket.on('cancel', function(data) {
			socket.broadcast.to(data.application_id).emit('cancelled', data);
		});

		socket.on('forfeit', function(data) {
			socket.broadcast.to(data.application_id).emit('forfeitted', data);
		});

		socket.on('connect', function(data) {
			socket.broadcast.to(data.application_id).emit('connected', data);
		});
		
		//////////////////////////////////////////////////////
		//										SENT FROM USERS
		//////////////////////////////////////////////////////			
		socket.on('accept', function(data) {
			console.log("accept data:", data)
			socket.broadcast.to(data.application_id).emit('accepted', data);
		});		
		
		socket.on('decline', function(data) {
			console.log("decline")
			socket.broadcast.to(data.application_id).emit('declined', data);
		});
		
		socket.on("logout", function() {
			socket.disconnect();
		});
	});
}