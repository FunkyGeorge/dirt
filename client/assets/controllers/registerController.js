app.controller('registerController', function ($scope, $location, $cookies, $routeParams, $timeout, truckersFactory, contractorsFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	$scope.step = 1;
	$scope.user_type = $routeParams.user_type;

	$scope.register = function() {
		$scope.register_error = null;
		if ($scope.step == 2 && $scope.user_type == 'trucker')
			$scope.step = 3;
		else if ($scope.step == 3 && $scope.user_type == 'trucker')
			truckersFactory.register($scope.new_user, function(data) {
				if (data.errors) {
					$scope.step = 2;
					for (key in data.errors) {
						$scope.register_error = data.errors[key].message;
						break;
					}
				}
				else {
					$scope.step = 4;
					$timeout(function() {
						$location.url('/');
					}, 3000);
				}
			});
		else if ($scope.step == 2 && $scope.user_type == 'contractor')
			contractorsFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.register_error = data.errors[key].message;
						break;
					}
				else {
					$scope.step = 4;
					$timeout(function() {
						$location.url('/');
					}, 3000);
				}
			});
		else
			$scope.step = 1;
	}
});
