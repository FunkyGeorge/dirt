app.controller('loginController', function ($scope, $location, $cookies, $routeParams, usersFactory, truckersFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	if ($routeParams.user_type == 'user')
		$scope.user_type = 'trucker';
	else if ($routeParams.user_type == 'trucker')
		$scope.user_type = 'user';
	else
		$location.url('/welcome');

	$scope.login = function() {
		$scope.error = null;
		if ($routeParams.user_type == 'trucker')
			truckersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					$location.url('/');
				}
			});
		else if ($routeParams.user_type == 'user')
			usersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else
					$location.url('/');
			});
		else
			$location.url('/welcome');
	}
});
