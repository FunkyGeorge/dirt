app.controller("invoicesController", function ($scope, $location, applicationsFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		applicationsFactory.index(function(data) {
			if (data.errors) {
				var error = "Could not load invoices.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
			}
			else {
				$scope.cur_app = null;
				$scope.status = 3;
				$scope.applications = data;
			}
		});
	}
	else
		$location.url("/welcome");

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	$scope.setCurApp = function(app) {
		console.log(app)
		$scope.cur_app = app;
	}

	//////////////////////////////////////////////////////
	//										APPLICATION
	//////////////////////////////////////////////////////
	$scope.payInvoice = function(token) {
		console.log($scope.cur_app)
		applicationsFactory.payInvoice($scope.cur_app.id, token, function (data) {
			if (data.errors) {
				var error = "Error processing payment/updating application status.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
			}
			else {
				socket.emit("pay", {
					application_id: $scope.cur_app.id,
					name: $scope.name
				});
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `Successfully made payment, thank you! The invoice is now in your history.`
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
				$location.url(`/invoices#${Date.now()}`);
			}
		});
	}
});
