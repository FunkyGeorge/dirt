app.controller('jobsShowController', function ($scope, $location, $cookies, $timeout, $routeParams, jobsFactory, applicationsFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.id = payload.id;
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'user';
		$scope.error = null;
		jobsFactory.show($routeParams.id, function(data) {
			if (data.errors) {
				$scope.error = "Invalid job/job no longer availale. You will now be redirected."
				$timeout(function() {
					$location.url('/');
				}, 3000);				
			}
			else {
				$scope.job = data;
				$scope.job.src = $scope.job.dirt_type.toLowerCase().replace(" - ", "_").replace(" ",  "_");
				$scope.job.completion_date = new Date(data.completion_date);
				$scope.job.pickup_only = Boolean(data.pickup_only);
				$scope.job.loader_pickup = Boolean(data.loader_pickup);
				$scope.job.loader_dropoff = Boolean(data.loader_dropoff);
				$scope.mode = 'show';
			}
		});
	}
	else
		$location.url('/welcome');

	$scope.logout = function() {
		$cookies.remove('token');
		$location.url('/welcome');
	}
	
	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////
	$scope.deleteJob = function() {

	}

	$scope.updateJob = function() {
		$scope.error = null;
		jobsFactory.update($scope.job, function(data) {
			if (data.errors) {
				$scope.error = "Not able to save changes. ";
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}							
			}
			else
				$scope.mode = 'show';
		});
	}

	//////////////////////////////////////////////////////
	//										IMAGE
	//////////////////////////////////////////////////////
	$scope.createImage = function() {

	}

	$scope.deleteImage = function() {

	}

	//////////////////////////////////////////////////////
	//										APPLICATION
	//////////////////////////////////////////////////////
	$scope.createApplication = function() {
		applicationsFactory.create({job_id: $scope.job.id}, function(data) {
			if (data.errors) {
				$scope.error = "You were not able to accept the job. ";
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}			
			}
			else
				$scope.mode = 'success';
		});
	}

});
