app.controller('jobsShowController', function ($scope, $location, $timeout, $routeParams, 
jobsFactory, applicationsFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		$scope.error = null;
		jobsFactory.show($routeParams.id, function(data) {
			if (data.errors) {
				$scope.error = "Could not load job. "
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
				$scope.job.src = $scope.job.dirt_type.toLowerCase().replace(" - ", "_").replace("-", "_").replace(/ /g,  "_");
				$scope.job.completion_date = new Date(data.completion_date);
				$scope.job.p_loader = Boolean(data.p_loader);
				$scope.job.d_loader = Boolean(data.d_loader);
				$scope.mode = 'show';
			}
		});
	}
	else
		$location.url('/welcome');
	
	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////
	$scope.relistJob = function() {
		$scope.error = null;
		jobsFactory.relist({id: $scope.job.id, job_status: 0}, function(data) {
			if (data.errors) {
				$scope.error = "Unable to re-list job. ";
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}							
			}
			else {
				$scope.job.job_status = 0;
			}
		});
	}
	
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
					$scope.mode = 'deleted';
					$timeout(function() {
						$location.url('/');
					}, 3000);	
				}
			});
		}
	}


	//////////////////////////////////////////////////////
	//										APPLICATION
	//////////////////////////////////////////////////////
	$scope.createApplication = function() {
		applicationsFactory.create({job_id: $scope.job.id}, function(data) {
			if (data.errors) {
				$scope.error = "You were not able to apply for the job. ";
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}			
			}
			else {
				console.log("data is", data)
				$scope.application_id = data.id;
				socket.emit("apply", {
					application_id: data.id, 
					user_id: $scope.job.user_id,
					name: $scope.name
				});
				$scope.mode = 'applied';
			}
		});
	}

	$scope.cancelApplication = function() {
		if (confirm("You will not be able to see this job again if you cancel your application.\n\nClick\"OK\" to continue removing application.") == true) {
			applicationsFactory.cancel($scope.job.application_id, function(data) {
				if (data.errors) {
					$scope.error = "Not able to cancel your job application. ";
					for (key in data.errors) {
						$scope.error += data.errors[key].message;
						break;
					}			
				}
				else {
					socket.emit("cancel", {
						application_id: $scope.job.application_id,
						name: $scope.name
					});
						$location.url('/');
				}
			});
		}
	}

	$scope.forfeitApplication = function() {
		if (confirm("You will not be able to see this job again if you forfeit this job. Note that a refund will not be issued for the lead fee.\n\nClick\"OK\" to continue forfeitting job.") == true) {
			applicationsFactory.forfeit($scope.job.application_id, function(data) {
				if (data.errors) {
					$scope.error = "Not able to forfeit this job. ";
					for (key in data.errors) {
						$scope.error += data.errors[key].message;
						break;
					}			
				}
				else {
					socket.emit("forfeit", {
						job_id: $scope.job.id,
						application_id: $scope.job.application_id,
						name: $scope.name
					});
					$location.url('/');
				}
			});
		}
	}

});
