app.controller("invoicesController", function ($scope, $location, invoicesFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = "truck_type" in payload ? "trucker" : "user";
		$scope.error = null;
		invoicesFactory.index(function(data) {
			if (data.errors) {
				$scope.error = "Could not load invoices. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else {
				$scope.invoices = data;
				$scope.mode = "pending";
			}
		});
	}
	else
		$location.url("/welcome");

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////

	//////////////////////////////////////////////////////
	//										SOCKET
	//////////////////////////////////////////////////////
	// socket.on('message', function(data) {
	// 	$.notify({
	// 		icon: "glyphicon glyphicon-envelope",
	// 		message: `New message from ${data.name}.`,
	// 		url: `#/messages/${data.application_id}`
	// 	}, {
	// 		placement: {
	// 			from: "bottom"
	// 		},
	// 		delay: 4000,
	// 		animate: {
	// 			enter: 'animated fadeInUp',
	// 			exit: 'animated fadeOutDown',
	// 		}
	// 	});
	// });

	// socket.on('accepted', function(data) {
	// 	$.notify({
	// 		icon: "glyphicon glyphicon-check",
	// 		message: `${data.first_name} accepted your application!`,
	// 		url: `#/messages/${data.id}`
	// 	}, {
	// 		placement: {
	// 			from: "bottom"
	// 		},
	// 		delay: 4000,
	// 		animate: {
	// 			enter: 'animated fadeInUp',
	// 			exit: 'animated fadeOutDown',
	// 		}
	// 	});
	// });

});
