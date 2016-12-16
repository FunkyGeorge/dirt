app.controller('indexController', function ($scope, $location, $routeParams, $cookies, jobsFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	function appendJobs(){
		if(!$scope.jobs){
			$scope.jobs = [];
		}
		for(var i = $scope.data[1]*5; i < ($scope.data[1]+1)*5; i++){
			$scope.jobs[i] = $scope.data[0][i];
			if ($scope.data[0][i+1])
				continue;
			else
				break;

		}
		if ($scope.data[0][$scope.jobs.length])
			$scope.data[1] += 1;
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		var position;
		$scope.id = payload.id;
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'contractor';
		$scope.error = null;
		$scope.state = [1, true, false];  //state variable [int scroll, bool keepscrolling flag, bool distance/latest flag]
		navigator.geolocation.getCurrentPosition(showPosition)
		function showPosition(position){
			console.log(position.coords.latitude);
			console.log(position.coords.longitude);
		}
	}
	else
		$location.url('/welcome');

	function appendJobs(){
		jobsFactory.index($scope.state, function(data) {
			if (data.errors)
				$scope.error = "Something went wrong, please wait a while and try reloading."
			else {
				if ($scope.jobs && $scope.jobs.length == data.length)
					$scope.state[1] = false;
				$scope.jobs = data;
				$scope.state[0]++;
			}
		});
	}

	$scope.append = function(){
		if ($scope.state && $scope.state[1]){
			appendJobs();
		}
	};

	$scope.logout = function() {
		$cookies.remove('token');
		$location.url('/welcome');
	}
});
