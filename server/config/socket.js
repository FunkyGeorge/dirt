module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {			
		socket.on('subscribe', function(id) {
			socket.join(id);
		});

		socket.on('send', function(data) {
			io.to(data.application_id).emit('sent', data);
		});

		socket.on('apply', function(data) {
			socket.broadcast.to(data.id).emit('applied', data);
		});

		socket.on('accept', function(data) {
			socket.broadcast.to(data.id).emit('accepted', data);
		});		
		
		socket.on('decline', function(data) {
			socket.broadcast.to(data.id).emit('declined', data);
		});
		
		socket.on('cancel', function(data) {
			socket.broadcast.to(data.id).emit('cancelled', data);
		});

		socket.on("logout", function() {
			socket.disconnect();
		});
	});
}
