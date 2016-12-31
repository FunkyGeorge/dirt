var payload, ronin_token, socket;

//////////////////////////////////////////////////////
//										HELPER FUNCTIONS
//////////////////////////////////////////////////////
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

// Display error:
function displayErrorNotification(error) {
	$.notify({
		icon: "glyphicon glyphicon-warning-sign",
		message: `${error}`,
	}, {
		type: "danger",
		newest_on_top: true,
		placement: {
			from: "top",
			align: "center"
		},
		delay: 0,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutDown',
		}
	});	
}

//////////////////////////////////////////////////////
//										APP.RUN
//////////////////////////////////////////////////////
app.run(function($rootScope, $timeout) {
	var allow_notify = true;

	// Define and invoke function to set user:
	($rootScope.setUser = function() {
		setPayload();
		if(payload) {
			$rootScope.id = payload.id;
			$rootScope.name = payload.first_name + " " + payload.last_name;
			$rootScope.user_type = 'truck_type' in payload ? 'trucker' : 'user';
			// $rootScope.messages = [];
		}
		
		setSocket();
		if (socket) {
			// Define socket event handlers:
			socket.on('sent', function(data) {
				// Only notify on new messages when you're not the sender 
				// and you're not currently viewing that conversation:
				if (allow_notify && data.name != $rootScope.name && 
				(data.application_id != $rootScope._app.id || !window.location.hash.includes("messages")))
					$.notify({
						icon: "glyphicon glyphicon-envelope",
						message: `New message from ${data.name}.`,
						url: `#/messages/${data.application_id}#${Date.now()}`,
						target: "_self"
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
						}				
					});
				else if (data.application_id == $rootScope._app.id && window.location.hash.includes("messages")) {
					$rootScope.messages.push(data);
					$rootScope.$apply();
					$timeout(function() {
						var _ = document.getElementById("chat");
						_.scrollTop = _.scrollHeight;				
					}, 0, false);
				}
			});

			//////////////////////////////////////////////////////
			//										SENT FROM TRUCKERS
			//////////////////////////////////////////////////////			
			socket.on('applied', function(data) {
				if (data.user_id == $rootScope.id) {
					socket.emit("subscribe", data.application_id);
					$.notify({
						icon: "glyphicon glyphicon-check",
						message: `${data.name} applied for your job!`,
						url: `#/messages/${data.application_id}`,
						target: "_self"
					}, {
						type: "info",
						placement: {
							from: "bottom"
						},
						delay: 4000,
						animate: {
							enter: 'animated fadeInUp',
							exit: 'animated fadeOutDown',
						} 
					});
				}
			});

			socket.on('cancelled', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-info-sign",
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
					}
				});
			});

			socket.on('forfeitted', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-warning-sign",
					message: `${data.name} forfeitted the job. Click here to view/relist the job.`,
					url: `#/jobs/${data.job_id}#${Date.now()}`,
					target: "_self"
				}, {
					type: "danger",
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

			socket.on('connected', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-info-sign",
					message: `You're now connected with ${data.name}, say hi!`,
					url: `#/messages/${data.application_id}#${Date.now()}`,
					target: "_self"
				}, {
					type: "info",
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

			//////////////////////////////////////////////////////
			//										SENT FROM USERS
			//////////////////////////////////////////////////////	
			socket.on('accepted', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `${data.name} accepted your application!`,
					url: `#/messages/${data.application_id}#${Date.now()}`,
					target: "_self"
				}, {
					type: "success",
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

			socket.on('declined', function(data) {
				$.notify({
					icon: "glyphicon glyphicon-info-sign",
					message: `${data.name} declined your application. Better luck next time!`,
				}, {
					type: "warning",
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