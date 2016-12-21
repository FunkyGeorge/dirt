app.controller('jobsShowController', function ($scope, $location, $cookies, $timeout, $routeParams, 
jobsFactory, applicationsFactory) {

	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.id = payload.id;
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'user';
		$scope.error = null;
		jobsFactory.show($routeParams.id, function(data) {
			if (data.errors || data.length == 0) {
				$scope.error = "Invalid job/job no longer availale. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
				$scope.error += " You will now be redirected."
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

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	$scope.logout = function() {
		$cookies.remove('token');
		$location.url('/welcome');
	}
	
	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////
	$scope.deleteJob = function() {
		$scope.error = null;
		if (confirm("Are you sure you want to delete this job listing? Doing so will remove all pending applications and conversations for this listing.\n\nClick\"OK\" to continue removing job.") == true) {
			jobsFactory.delete($scope.job.id, function(data) {
				if (data.errors) {
					$scope.error = "Unable to remove the job listing. ";
					for (key in data.errors) {
						$scope.error += data.errors[key].message;
						break;
					}			
				}
				else {
					$scope.mode = 'delete';
					$timeout(function() {
						$location.url('/');
					}, 3000);	
				}
			});
		}
	}

	// $scope.updateJob = function() {
	// 	$scope.error = null;
	// 	jobsFactory.update($scope.job, function(data) {
	// 		if (data.errors) {
	// 			$scope.error = "Not able to save changes. ";
	// 			for (key in data.errors) {
	// 				$scope.error += data.errors[key].message;
	// 				break;
	// 			}							
	// 		}
	// 		else
	// 			$scope.mode = 'show';
	// 	});
	// }

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

	$scope.removeApplication = function() {
		
	}

});
