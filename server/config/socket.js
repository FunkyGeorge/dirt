module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {
		socket.on('subscribe', function(application_id) {
			socket.join(application_id);
		});

		socket.on('send', function(data) {
			io.in(data.application_id).emit('message', data);
		});
	});
}
