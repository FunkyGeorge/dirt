app.controller("invoicesController", function ($scope, $location, invoicesFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
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

});
