app.controller('loginController', function ($scope, $location, $cookies, usersFactory, truckersFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	$scope.login = function() {
		$scope.error = null;
		if ($scope.user_type == 'trucker')
			truckersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.login_error = data.errors[key].message;
						break;
					}
				else {
					$location.url('/');
				}
			});
		else if ($scope.user_type == 'user')
			usersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						console.log("err");
						$scope.login_error = data.errors[key].message;
						break;
					}
				else {
					console.log("success");
					$location.url('/');
				}
			});
		else
			$location.url('/welcome');
	}
});
