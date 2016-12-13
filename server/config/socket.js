module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {
		socket.on('subscribe', function(pending_id) {
			socket.join(pending_id);
		});

		socket.on('send', function(data) {
			io.in(data.pending_id).emit('message', data);
		});
	});
}
