app.controller('jobsShowController', function ($scope, $location, $timeout, $routeParams,
jobsFactory, applicationsFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		jobsFactory.show($routeParams.id, function(data) {
			if (data.errors) {
				var error = "Could not load this job.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
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
		jobsFactory.relist($scope.job.id, function(data) {
			if (data.errors) {
				var error = "Unable to relist this job.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
			}
			else {
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `Successfully relisted job.`,
					url: `#/jobs/${$scope.job.id}#${Date.now()}`,
					target: "_self"
				}, {
					type: "success",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					}
				});
				$location.url(`/jobs/${$scope.job.id}#${Date.now()}`)
			}
		});
	}

	$scope.deleteJob = function() {
		if (confirm("Are you sure you want to delete this job listing? Doing so will remove all pending applications and conversations for this listing.\n\nClick\"OK\" to continue removing job.") == true) {
			jobsFactory.delete($scope.job.id, function(data) {
				if (data.errors) {
					var error = "Unable to remove this job listing.";
					for (key in data.errors)
						error += " " + data.errors[key].message;
					displayErrorNotification(error);
				}
				else {
					$.notify({
						icon: "glyphicon glyphicon-check",
						message: `Successfully removed job listing.`
					}, {
						type: "success",
						placement: {
							from: "bottom"
						},
						delay: 4000,
						animate: {
							enter: 'animated fadeInUp',
							exit: 'animated fadeOutDown',
						}
					});
					$location.url('/');
				}
			});
		}
	}

	$scope.edit = function(){
		$location.url('/jobs/edit/' + $scope.job.id);
	}


	//////////////////////////////////////////////////////
	//										APPLICATION
	//////////////////////////////////////////////////////
	$scope.createApplication = function() {
		applicationsFactory.create({job_id: $scope.job.id}, function(data) {
			if (data.errors) {
				var error = "Could not apply for this job.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
			}
			else {
				$scope.application_id = data.id;
				socket.emit("apply", {
					application_id: data.id,
					user_id: $scope.job.user_id,
					name: $scope.name
				});
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `Successfully applied for job!`,
					url: `#/messages/${data.id}`,
					target: "_self"
				}, {
					type: "success",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					}
				});
				$scope.mode = 'applied';
			}
		});
	}

	$scope.cancelApplication = function() {
		if (confirm("You will not be able to see this job again if you cancel your application.\n\nClick\"OK\" to continue removing application.") == true) {
			applicationsFactory.cancel($scope.job.application_id, function(data) {
				if (data.errors) {
					var error = "Not able to cancel your job application.";
					for (key in data.errors)
						error += " " + data.errors[key].message;
					displayErrorNotification(error);
				}
				else {
					socket.emit("cancel", {
						application_id: $scope.job.application_id,
						name: $scope.name
					});
					$.notify({
						icon: "glyphicon glyphicon-check",
						message: `Successfully removed application.`
					}, {
						type: "success",
						placement: {
							from: "bottom"
						},
						delay: 4000,
						animate: {
							enter: 'animated fadeInUp',
							exit: 'animated fadeOutDown',
						}
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
					var error = "Not able to forfeit this job.";
					for (key in data.errors)
						error += " " + data.errors[key].message;
					displayErrorNotification(error);
				}
				else {
					socket.emit("forfeit", {
						job_id: $scope.job.id,
						application_id: $scope.job.application_id,
						name: $scope.name
					});
					$.notify({
						icon: "glyphicon glyphicon-check",
						message: `Successfully forfeited the job.`
					}, {
						type: "success",
						placement: {
							from: "bottom"
						},
						delay: 4000,
						animate: {
							enter: 'animated fadeInUp',
							exit: 'animated fadeOutDown',
						}
					});
					$location.url('/');
				}
			});
		}
	}

});
