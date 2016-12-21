// var connected = false;
var socket;
socket = io.connect();

socket.on('message', function(data) {
	$.notify({
		icon: "glyphicon glyphicon-envelope",
		message: `New message from ${data.name}.`,
		url: `#/messages/${data.application_id}`
	}, {
		placement: {
			from: "bottom"
		},
		delay: 4000,
		animate: {
			enter: 'animated fadeInUp',
			exit: 'animated fadeOutDown',
		}
	});
});

socket.on('accepted', function(data) {
	console.log("here")
	$.notify({
		icon: "glyphicon glyphicon-check",
		message: `${data.first_name} accepted your application!`,
		url: `#/messages/${data.id}`
	}, {
		placement: {
			from: "bottom"
		},
		delay: 4000,
		animate: {
			enter: 'animated fadeInUp',
			exit: 'animated fadeOutDown',
		}
	});
});