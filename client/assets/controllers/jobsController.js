app.controller('jobsController', function ($scope, $location, $cookies, $routeParams, jobsFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'contractor';
		if ($scope.user_type != 'contractor')
			$location.url('/');
	}
	else
		$location.url('/welcome');

	$scope.new_job = {
		pickup_only: false,
		loader_onsite: false
	};
	$scope.today = new Date();
	$scope.step = 1;
	$scope.progress = {'width': '30%'};

	$scope.setAmount = function() {
		$scope.new_job.amount = Math.round($scope.length * $scope.depth * $scope.height * 100)/100;
		$scope.step = 1;
	}

	$scope.create = function() {
		$scope.error = null;
		jobsFactory.create($scope.new_job, function(data) {
			if (data.errors) {
				$scope.error = 'Could not create new job. '
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else {
				$scope.id = data.id;
				$scope.step = 4;
			}
		});
	}
});
