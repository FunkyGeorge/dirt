app.controller("messagesController", function ($scope, $rootScope, $location, $route, $routeParams, $timeout, 
moment, applicationsFactory, messagesFactory, jobsFactory, invoicesFactory) {

	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		applicationsFactory.index(function(data) {
			if (data.errors) {
				var error = "Could not load job applications and messages.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);					
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
				var error = "Unable to accept this application.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error + " Try reloading the page.");
			}
			else {
				socket.emit("accept", {
					application_id: $scope.cur_app.id,
					name: $scope.name
				});

				// Notify all other users that they've been declined:
				for (var i = 0; i < $scope.apps.length; i++) {
					if ($scope.apps[i][0].job_id == $scope.cur_app.job_id)
						for (var j = 0; j < $scope.apps[i].length; j++)
							if ($scope.apps[i][j].id != $scope.cur_app.id)
								socket.emit("decline", {
									application_id: $scope.apps[i][j].id,
									name: $scope.name
								});
				}

				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `Successfully accepted ${$scope.cur_app.first_name}'s' application!`
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
				$location.url(`/messages/${$scope.cur_app.id}#${Date.now()}`);
			}
		});
	}

	$scope.declineApplication = function() {
		applicationsFactory.decline($scope.cur_app.id, function(data) {
			if (data.errors) {
				var error = "Unable to decline this application.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error + " Try reloading the page.");
			}
			else {
				socket.emit("decline", {
					application_id: $scope.cur_app.id,
					name: $scope.name
				});	
			}
			$.notify({
				icon: "glyphicon glyphicon-check",
				message: `Successfully declined the application.`
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
			$location.url(`/messages#${Date.now()}`);
		});
	}

	$scope.cancelApplication = function() {
		if (confirm("You will not be able to see this job again if you cancel your application.\n\nClick\"OK\" to continue removing application.") == true) {
			applicationsFactory.cancel($scope.cur_app.id, function(data) {
				if (data.errors) {
					var error = "Could not cancel this job application.";
					for (key in data.errors)
						error += " " + data.errors[key].message;
					displayErrorNotification(error + " Try reloading the page.");
				}
				else {
					socket.emit("cancel", {
						application_id: $scope.cur_app.id,
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
					$location.url(`/messages`);
				}
			});
		}
	}

	$scope.forfeitApplication = function() {
		if (confirm("You will not be able to see this job again if you forfeit this job. Note that a refund will not be issued for the lead fee.\n\nClick\"OK\" to continue forfeitting job.") == true) {
			applicationsFactory.forfeit($scope.cur_app.id, function(data) {
				if (data.errors) {
					var error = "Could not forfeit this job.";
					for (key in data.errors)
						error += " " + data.errors[key].message;
					displayErrorNotification(error + " Try reloading the page.");
				}
				else {
					socket.emit("forfeit", {
						job_id: $scope.cur_app.job_id,
						application_id: $scope.cur_app.id,
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
					$location.url(`/messages`);
				}
			});
		}
	}

	$scope.payLeadFee = function(token) {
		console.log(token)
	}

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(application) {
		$rootScope._app = application;
		$scope.cur_app = application;
		if (application.status > 1)
			messagesFactory.show(application.id, function(data) {
				if (data.errors) {
					var error = "Could not load conversation.";
					for (key in data.errors)
						error += " " + data.errors[key].message;
					displayErrorNotification(error + " Try reloading the page.");					
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
				var error = "Message not sent.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);					
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
				var error = "Could not load job.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error + " Try reloading the page.");					
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
				var error = "Invoice not sent.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);
			}
			else
				$scope.mode = "invoiced";
		});
	}		
});