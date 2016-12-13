app.controller('indexController', function ($scope, $location, $routeParams, $cookies, jobsFactory) {
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
		$scope.scroll = [1, true];
		// appendJobs();
	}
	else
		$location.url('/welcome');

	function appendJobs(){
		jobsFactory.index($scope.scroll[0], function(data) {
			if (data.errors)
				$scope.error = "Something went wrong, please wait a while and try reloading."
			else {
				if ($scope.jobs && $scope.jobs.length == data.length)
					$scope.scroll[1] = false;
				$scope.jobs = data;
				$scope.scroll[0]++;
			}
		});
	}

	$scope.append = function(){
		if ($scope.scroll[1])
			appendJobs();
	};

	$scope.logout = function() {
		$cookies.remove('token');
		$location.url('/welcome');
	}
});
