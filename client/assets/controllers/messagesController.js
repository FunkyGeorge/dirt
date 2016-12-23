app.controller("messagesController", function ($scope, $location, $routeParams, $timeout, 
moment, applicationsFactory, messagesFactory, jobsFactory, invoicesFactory) {

	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		$scope.error = null;
		applicationsFactory.index(function(data) {
			if (data.errors) {
				$scope.error = "Could not load job applications. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
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

		socket.emit('accept', $scope.cur_app);
	}

	$scope.declineApplication = function() {
		
	}

	$scope.cancelApplication = function() {
		
	}

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(application) {
		$scope.cur_app = application;		
		messagesFactory.show(application.id, function(data) {
			if (data.errors) {
				$scope.error = "Could not load conversation. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
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
				$scope.error = "Could not send message. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}							
			}
			else
				$scope.new_message = "";				
		});
	}

	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////
	$scope.showJob = function() {
		jobsFactory.show($scope.curr_app.job_id, function(data) {
			if (data.errors) {
				$scope.error = "Could not load job. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
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
		$scope.new_invoice.job_id = $scope.curr_app.job_id;
		invoicesFactory.create($scope.new_invoice, function(data) {
			if (data.errors) {
				$scope.error = "Could not create invoice. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else
				$scope.mode = "success";
		});
	}		
});
