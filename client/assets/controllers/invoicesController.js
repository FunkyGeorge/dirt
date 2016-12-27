app.controller("invoicesController", function ($scope, $location, invoicesFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		invoicesFactory.index(function(data) {
			if (data.errors) {
				displayErrorNotification("Could not load invoices.");
				for (key in data.errors)
					displayErrorNotification(data.errors[key].message);
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
