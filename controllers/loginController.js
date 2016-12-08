app.controller('loginController', function ($scope, $location, $cookies, $routeParams, contractorsFactory, truckersFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	if ($routeParams.user_type == 'contractor')
		$scope.user_type = 'trucker';
	else if ($routeParams.user_type == 'trucker')
		$scope.user_type = 'contractor';
	else
		$location.url('/welcome');

	$scope.login = function() {
		$scope.login_error = null;
		if ($routeParams.user_type == 'trucker') 
			truckersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.login_error = data.errors[key].message;
						break;
					}
				else
					$location.url('/');
			});
		else if ($routeParams.user_type == 'contractor')
			contractorsFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.login_error = data.errors[key].message;
						break;
					}
				else
					$location.url('/');
			});
		else
			$location.url('/welcome');
	}
});