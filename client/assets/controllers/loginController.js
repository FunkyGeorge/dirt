app.controller('loginController', function ($scope, $location, $window, usersFactory, truckersFactory) {
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
					$window.location.href = ('/');
				}
			});
		else if ($scope.user_type == 'user')
			usersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else
					$window.location.href = ('/');
			});
	}
});
