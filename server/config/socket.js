module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {
		socket.on('subscribe', function(application_id) {
			socket.join(application_id);
		});

		socket.on('send', function(data) {
			io.to(data.application_id).emit('message', data);
		});

		socket.on('acceptApplication', function(data) {
			console.log("here")
			socket.broadcast.to(data.id).emit('accepted', data);
		});
		
		socket.on('declineApplication', function(data) {
			socket.broadcast.to(data.id).emit('declined', data);
		});
		
		socket.on('cancelApplication', function(data) {
			socket.broadcast.to(data.id).emit('cancelled', data);
		});
	});
}
