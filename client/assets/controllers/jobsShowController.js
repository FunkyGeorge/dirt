app.controller('jobsShowController', function ($scope, $location, $cookies, $timeout, $routeParams, jobsFactory, imagesFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.id = payload.id;
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'contractor';
		$scope.error = null;
		jobsFactory.show($routeParams.id, function(data) {
			if (data.errors) {
				$scope.error = 'Invalid job/job no longer availale. You will now be redirected.'
				$timeout(function() {
					$location.url('/');
				}, 3000);				
			}
			else {
				$scope.mode = 'show';
				$scope.job = data;
				$scope.job.completion_date = new Date(data.completion_date);
				$scope.job.pickup_only = $scope.job.pickup_only ? true: false;
				$scope.job.loader_onsite = $scope.job.loader_onsite ? true: false;
			}
		});
	}
	else
		$location.url('/welcome');

	$scope.update = function() {
		$scope.mode = 'show';
	}

	$scope.logout = function() {
		$cookies.remove('token');
		$location.url('/welcome');
	}
});
