app.controller('registerController', function ($scope, $rootScope, $location, truckersFactory, usersFactory) {
	if (payload)
		$location.url('/');

	$scope.extend = false;
	$scope.user_type = 'trucker';
	$scope.new_user = {truck_type: false};
	$scope.year = new Date().getFullYear();
	$scope.step = 1;

	$scope.register = function() {
		$scope.error = null;
		if ($scope.new_user.password != $scope.new_user.confirm_password)
			$scope.error = "Passwords do not match."
		else if ($scope.user_type == 'trucker' && !$scope.extend)
			$scope.extend = true;
		else if ($scope.user_type == 'trucker' && $scope.extend)
			truckersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					$scope.setUser();
					$scope.step = 2;
				}
			});
		else if ($scope.user_type == 'user')
			usersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					$scope.setUser();
					$scope.step = 2;
				}
			});
	}
});
