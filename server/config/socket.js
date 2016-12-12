module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {
		socket.on('subscribe', function(room) {
			socket.join(room);
		});

		socket.on('send', function(data) {
			io.in(data.room).emit('message', data);
		});
	});
}
