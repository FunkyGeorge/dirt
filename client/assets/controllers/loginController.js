app.controller('loginController', function ($scope, $location, usersFactory, truckersFactory) {
	if (payload)
		$location.url('/');

	$scope.login = function() {
		$scope.error = null;
		if ($scope.user_type == 'trucker')
			truckersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					setPayload();
					setSocket();
					$scope.setUser();
					$location.url('/');
				}
			});
		else if ($scope.user_type == 'user')
			usersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					setPayload();
					setSocket();
					$scope.setUser();
					$location.url('/');
				}
			});
	}
});
