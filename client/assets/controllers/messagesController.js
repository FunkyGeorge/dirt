app.controller("messagesController", function ($scope, $rootScope, $location, $route, $routeParams, $timeout, 
moment, applicationsFactory, messagesFactory, jobsFactory, invoicesFactory) {

	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		applicationsFactory.index(function(data) {
			if (data.errors) {
				displayErrorNotification("Could not load job applications and messages.");
				for (key in data.errors)
					displayErrorNotification(data.errors[key].message);
			}
			else {
				$scope.apps = [];
				// Organize applications into groups:
				for (var i = 0; i < data.length; i++) {						
					if ($scope.apps.length == 0 || $scope.apps[$scope.apps.length - 1][0].job_id != data[i].job_id)
						$scope.apps.push([data[i]]);
					else if ($scope.apps[$scope.apps.length - 1][0].job_id == data[i].job_id)
						$scope.apps[$scope.apps.length - 1].push(data[i]);
				}

				$scope.status = 0;
				$scope.mode = "message";

				// Check if certain application requested in URL:
				if ($routeParams.id)
					for (var i = 0; i < data.length; i++)
						if ($routeParams.id == data[i].id) {
							$scope.status = data[i].status > 0 ? 1 : 0;
							$scope.showMessages(data[i]);
							break;
						}
			}
		});
	}
	else
		$location.url("/welcome");

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	$scope.filterByStatus = function(value) {
		if ($scope.status == 0 && value[0].status == 0)
			return true;
		else if ($scope.status == 1 && value[0].status > 0)
			return true;
		else
			return false;
	}

	//////////////////////////////////////////////////////
	//										APPLICATION
	//////////////////////////////////////////////////////
	$scope.acceptApplication = function() {
		applicationsFactory.accept($scope.cur_app, function(data) {
			if (data.errors) {
				displayErrorNotification("Unable to accept this application.");
				for (key in data.errors)
					displayErrorNotification(data.errors[key].message);	
			}
			else {
				socket.emit("accept", {
					application_id: $scope.cur_app.id,
					name: $scope.name
				});
				$location.url(`/messages/${$scope.cur_app.id}#${Date.now()}`);
			}
		});
	}

	$scope.cancelApplication = function() {
		if (confirm("You will not be able to see this job again if you cancel your application.\n\nClick\"OK\" to continue removing application.") == true) {
			applicationsFactory.cancel($scope.cur_app.id, function(data) {
				if (data.errors) {
					displayErrorNotification("Could not cancel this job application.");
					for (key in data.errors)
						displayErrorNotification(data.errors[key].message);
				}
				else {
					socket.emit("cancel", {
						application_id: $scope.cur_app.id,
						name: $scope.name
					});
					$location.url('/messages');
				}
			});
		}
	}

	$scope.forfeitApplication = function() {
		if (confirm("You will not be able to see this job again if you forfeit this job. Note that a refund will not be issued for the lead fee.\n\nClick\"OK\" to continue forfeitting job.") == true) {
			applicationsFactory.forfeit($scope.cur_app.id, function(data) {
				if (data.errors) {
					displayErrorNotification("Could not forfeit this job.");
					for (key in data.errors)
						displayErrorNotification(data.errors[key].message);
				}
				else {
					socket.emit("forfeit", {
						job_id: $scope.cur_app.job_id,
						application_id: $scope.cur_app.id,
						name: $scope.name
					});
					$location.url('/messages');
				}
			});
		}
	}

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(application) {
		$rootScope.cur_app = application;
		if (application.status > 1)
			messagesFactory.show(application.id, function(data) {
				if (data.errors) {
					displayErrorNotification("Could not load conversation.");
					for (key in data.errors)
						displayErrorNotification(data.errors[key].message);
				}
				else {
					$scope.messages = data;
					$timeout(function() {
						var _ = document.getElementById("chat");
						_.scrollTop = _.scrollHeight;				
					}, 0, false);
				}
			});
	}

	$scope.createMessage = function() {
		var data = {
			name: $scope.name,
			application_id: $scope.cur_app.id,
			message: $scope.new_message,
			created_at: new Date()
		}
		$scope.user_type == "trucker" ? data.trucker_id = $scope.id : data.user_id = $scope.id;
		socket.emit('send', data);

		messagesFactory.create(data, function(data) {
			if (data.errors) {
				displayErrorNotification("Message not sent.");
				for (key in data.errors)
					displayErrorNotification(data.errors[key].message);						
			}
			else
				$scope.new_message = "";				
		});
	}

	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////
	$scope.showJob = function() {
		jobsFactory.show($scope.cur_app.job_id, function(data) {
			if (data.errors) {
				displayErrorNotification("Could not load job.");
				for (key in data.errors)
					displayErrorNotification(data.errors[key].message);
			}
			else {
				$scope.job = data;
				$scope.mode = "invoice";
			}
		});
	}

	//////////////////////////////////////////////////////
	//										INVOICE
	//////////////////////////////////////////////////////
	$scope.createInvoice = function() {
		$scope.new_invoice.cost = 300;
		$scope.new_invoice.job_id = $scope.cur_app.job_id;
		invoicesFactory.create($scope.new_invoice, function(data) {
			if (data.errors) {
				displayErrorNotification("Invoice not sent.");
				for (key in data.errors)
					displayErrorNotification(data.errors[key].message);
			}
			else
				$scope.mode = "invoiced";
		});
	}		
});
