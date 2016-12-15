app.controller("messagesController", function ($scope, $location, $cookies, $timeout, applicationsFactory, messagesFactory, jobsFactory, invoicesFactory) {
	function getPayload(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace("-", "+").replace("_", "/");
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get("token")) {
		var payload = getPayload($cookies.get("token"));
		$scope.id = payload.id;
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = "truck_type" in payload ? "trucker" : "user";
		$scope.error = null;
		applicationsFactory.index(function(data) {
			if (data.errors) {
				$scope.error = "Could not load conversation. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else {
				$scope.applications = data;
				$scope.mode = "message";
			}
		});
	}
	else
		$location.url("/welcome");

	socket.on('message', function(data) {
		if ($scope.new_message.application_id == data.application_id) {
			$scope.messages.push(data);
			$scope.$apply();
			$timeout(function() {
				var _ = document.getElementsByClassName("div_chat")[1];
				_.scrollTop = _.scrollHeight;				
			}, 0, false);		
		}
	});


	$scope.logout = function() {
		$cookies.remove("token");
		$location.url("/welcome");
	}

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(application_id, job_id) {
		$scope.job_id = job_id;
		socket.emit('subscribe', application_id);		
		
		messagesFactory.show(application_id, function(data) {
			if (data.errors) {
				$scope.error = "Could not load conversation. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else {
				$scope.new_message = {application_id: application_id};
				$scope.messages = data;
				$timeout(function() {
					var _ = document.getElementsByClassName("div_chat")[1];
					_.scrollTop = _.scrollHeight;				
				}, 0, false);
			}
		});
	}

	$scope.createMessage = function() {
		var data = {
			application_id: $scope.new_message.application_id,
			message: $scope.new_message.message,
			created_at: new Date()
		}
		$scope.user_type == "trucker" ? data.trucker_id = $scope.id : data.user_id = $scope.id;
		socket.emit('send', data);

		messagesFactory.create($scope.new_message, function(data) {
			if (data.errors) {
				$scope.error = "Could not send message. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}							
			}
			else
				$scope.new_message.message = "";				
		});
	}

	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////
	$scope.showJob = function() {
		jobsFactory.show($scope.job_id, function(data) {
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
		$scope.new_invoice.job_id = $scope.job_id;
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
