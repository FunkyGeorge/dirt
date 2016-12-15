app.controller('registerController', function ($scope, $location, $cookies, $routeParams, $timeout, truckersFactory, usersFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	$scope.step = 1;
	$scope.user_type = $routeParams.user_type;
	$scope.progress = {'width':'20%'};

	$scope.register = function() {
		$scope.error = null;
		if ($scope.step == 2 && $scope.user_type == 'trucker'){
			$scope.step = 3;
			$scope.progress = {'width':'90%'};
		}
		else if ($scope.step == 3 && $scope.user_type == 'trucker')
			truckersFactory.register($scope.new_user, function(data) {
				if (data.errors) {
					$scope.step = 2;
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
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
		else if ($scope.step == 2 && $scope.user_type == 'user')
			usersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					$scope.step = 4;
					$timeout(function() {
						$location.url('/');
					}, 3000);
				}
			});
		else {
			$scope.step = 1;
			$scope.progress = {'width':'20%'};
		}
	}
});
