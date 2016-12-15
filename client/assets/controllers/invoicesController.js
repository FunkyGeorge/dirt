app.controller("invoicesController", function ($scope, $location, $cookies, invoicesFactory) {
	function getPayload(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace("-", "+").replace("_", "/");
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get("token")) {
		var payload = getPayload($cookies.get("token"));
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


});
