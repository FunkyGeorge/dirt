app.controller('indexController', function ($scope, $location, $routeParams, $cookies, jobsFactory, geoFactory) {
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

		//state variable [scroll, keepscrolling flag, distance/latest flag, isLoadedflag]
		$scope.state = [1, true, true, false];

		//#####  Commented to save api calls  #####
		// navigator.geolocation.getCurrentPosition(showPosition)
		// function showPosition(position){
		// 	geoFactory.getCurrentZip(position.coords.latitude, position.coords.longitude, zipList(data));
		// }
		function zipList (data){
			geoFactory.getNearbyZips(data, function(res){
				$scope.zipcodes = res;
				$scope.state[3] = true;
				appendJobs();
			}); //result is 95112... insert near zips here
		}

		//TEMP
		zipList(95112);
	}
	else
		$location.url('/welcome');

	function appendJobs(){
		if ($scope.state[3]){ //isLoaded?
			jobsFactory.index($scope.state, $scope.zipcodes, function(data) {
				if (data.errors)
				$scope.error = "Something went wrong, please wait a while and try reloading."
				else {
					//CHECK HERE TO MAKE SURE I DIDN'T MESS UP FLAG
					if ($scope.jobs && $scope.jobs.length == data.length)
					$scope.state[1] = false;
					$scope.jobs = data;
					$scope.state[0]++;
				}
			});
		}
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
