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

	$scope.calculate = function(){

				switch ($scope.shape) {
					case '1':  //rectangle
						$scope.preview = Math.round($scope.length * $scope.depth * $scope.width * 100)/100;
						break;
					case '2':  //wedge
						$scope.preview = Math.round($scope.length * $scope.depth * $scope.width * 50)/100;
						break;
					case '3':  //cylinder
						$scope.preview = Math.round(Math.PI * $scope.depth * (($scope.width/2)**2) * 100)/100;
						break;
					case '4':  //cone
						$scope.preview = Math.round(Math.PI * ($scope.depth/3) * (($scope.width/2)**2) * 100)/100;
						break;
					case '5': //bowl
						$scope.preview = Math.round((2 * Math.PI * $scope.length * $scope.depth * $scope.width)/3 * 100)/100;
						break;
					case '6':
						$scope.preview = Math.round($scope.length * $scope.depth * $scope.width * 100)/100;
						break;
					default:
				}
	}

	$scope.setAmount = function() {
		$scope.new_job.amount = $scope.preview;
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
