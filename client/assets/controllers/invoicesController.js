app.controller("invoicesController", function ($scope, $location, invoicesFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		invoicesFactory.index(function(data) {
			if (data.errors) {
				var error = "Could not load invoices.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
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

});
