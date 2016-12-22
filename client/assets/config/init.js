//////////////////////////////////////////////////////
//										PAYLOAD/RONIN_TOKEN
//////////////////////////////////////////////////////
var payload;
var ronin_token;
var cookies = document.cookie.split(";");
for (var i = 0; i < cookies.length; i++) {
	if (cookies[i].indexOf("ronin_token=") != -1) {
		// Parse ronin_token from cookies:
		ronin_token = cookies[i].split("ronin_token=")[1];
		var base64Url = ronin_token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		payload = JSON.parse(window.atob(base64));
		break;
	}
}

//////////////////////////////////////////////////////
//										SOCKET
//////////////////////////////////////////////////////
var socket;
if (ronin_token) {
	socket = io.connect();

	// Subscribe to rooms:
	$.ajax({
		type: "GET",
		url: "/api/applications",
		dataType: "json",
		headers: {'authorization': `Bearer ${ronin_token}`},
		success: function(data) {
			for (var i = 0; i < data.length; i++)
				socket.emit('subscribe', data[i].id);
		}
	});

	//////////////////////////////////////////////////////
	//										SOCKET EVENT HANDLERS
	//////////////////////////////////////////////////////
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
}
