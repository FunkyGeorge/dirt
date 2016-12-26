//////////////////////////////////////////////////////
//										HELPER FUNCTIONS
//////////////////////////////////////////////////////
var payload, ronin_token, socket;

// Parse payload and ronin_token from cookies:
function setPayload() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		if (cookies[i].indexOf("ronin_token=") != -1) {
			ronin_token = cookies[i].split("ronin_token=")[1];
			var base64Url = ronin_token.split('.')[1];
			var base64 = base64Url.replace('-', '+').replace('_', '/');
			payload = JSON.parse(window.atob(base64));
			break;
		}
	}	
}

// Connect to sockets:
function setSocket() {
	if (ronin_token) {
		socket = io.connect();

		// Find rooms to subscribe to rooms:
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
	}
}

//////////////////////////////////////////////////////
//										APP.RUN
//////////////////////////////////////////////////////
app.run(function($rootScope) {
	var allow_notify = true;

	// Define and invoke function to set user:
	($rootScope.setUser = function() {
		setPayload();
		if(payload) {
			$rootScope.id = payload.id;
			$rootScope.name = payload.first_name + " " + payload.last_name;
			$rootScope.user_type = 'truck_type' in payload ? 'trucker' : 'user';
		}
		
		setSocket();
		if (socket) {
			// Define socket event handlers:
			socket.on('sent', function(data) {
				if (allow_notify)
					$.notify({
						icon: "glyphicon glyphicon-envelope",
						message: `New message from ${data.name}.`,
						url: `#/messages/${data.application_id}`
					}, {
						type: "info",
						placement: {
							from: "bottom"
						},
						delay: 4000,
						animate: {
							enter: 'animated fadeInUp',
							exit: 'animated fadeOutDown',
						},
						onShow: function () {
							allow_notify = false;
						},
						onClose: function() {
							allow_notify = true;
						},
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
						'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
						'<span data-notify="icon"></span> ' +
						'<span data-notify="message">{2}</span>' +
						'<a href="{3}" data-notify="url"></a>' +
						'</div>'				
					});
			});

			//////////////////////////////////////////////////////
			//										SENT FROM TRUCKERS
			//////////////////////////////////////////////////////			
			socket.on('applied', function(data) {
				console.log("new app", data)
				if (data.user_id == $rootScope.id) {
					socket.emit("subscribe", data.application_id);
					$.notify({
						icon: "glyphicon glyphicon-check",
						message: `${data.name} applied for your job!`,
						url: `#/messages/${data.application_id}`
					}, {
						type: "info",
						placement: {
							from: "bottom"
						},
						delay: 4000,
						animate: {
							enter: 'animated fadeInUp',
							exit: 'animated fadeOutDown',
						},					
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
						'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
						'<span data-notify="icon"></span> ' +
						'<span data-notify="message">{2}</span>' +
						'<a href="{3}" data-notify="url"></a>' +
						'</div>' 
					});
				}
			});

			socket.on('cancelled', function(data) {
				console.log("here")
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `${data.name} has cancelled their application for your job.`,
				}, {
					type: "warning",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					},					
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="message">{2}</span>' +
					'<a href="{3}" data-notify="url"></a>' +
					'</div>' 
				});
			});

			socket.on('forfeitted', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `${data.name} forfeitted the job. Click here to view/re-list the job.`,
					url: `#/jobs/${data.job_id}`
				}, {
					type: "warning",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					},					
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="message">{2}</span>' +
					'<a href="{3}" data-notify="url"></a>' +
					'</div>' 
				});
			});

			//////////////////////////////////////////////////////
			//										SENT FROM USERS
			//////////////////////////////////////////////////////	
			socket.on('accepted', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `${data.first_name} ${data.last_name} accepted your application!`,
					url: `#/messages/${data.id}`
				}, {
					type: "success",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					},					
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="message">{2}</span>' +
					'<a href="{3}" data-notify="url"></a>' +
					'</div>' 
				});
			});

			socket.on('declined', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `${data.first_name} ${data.last_name} declined your application. Better luck next time!`,
				}, {
					type: "warning",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					},					
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="message">{2}</span>' +
					'<a href="{3}" data-notify="url"></a>' +
					'</div>' 
				});
			});			

		}
	})();

	// Define logout function:
	$rootScope.logout = function() {
		// Disconnect from sockets:
		socket.emit("logout");
		
		// Destroy cookie:
		document.cookie = "ronin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		
		// Reset globals:
		payload = undefined;
		ronin_token = undefined;
		socket = undefined;
		$rootScope.id = undefined;
		$rootScope.name = undefined;
		$rootScope.user_type = undefined;
		
		// Relocate:
		location.href = ("/#/welcome");
	};
});