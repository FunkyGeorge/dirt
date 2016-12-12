app.controller("messagesController", function ($scope, $location, $cookies, $timeout, pendingsFactory, messagesFactory, jobsFactory) {
	function getPayload(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace("-", "+").replace("_", "/");
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get("token")) {
		var payload = getPayload($cookies.get("token"));
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = "truck_type" in payload ? "trucker" : "contractor";
		$scope.new_message = {sender: "truck_type" in payload ? 1 : 0};
		$scope.error = null;
		pendingsFactory.index(function(data) {
			if (data.errors) {
				$scope.error = "Could not load conversation. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else {
				$scope.pendings = data;
				$scope.mode = "message";
			}
		});
	}
	else
		$location.url("/welcome");

	socket.on('message', function(data) {
		$scope.messages.push(data);
		$scope.$apply();
		$timeout(function() {
			var _ = document.getElementsByClassName("div_chat")[1];
			_.scrollTop = _.scrollHeight;				
		}, 0, false);		
	});


	$scope.logout = function() {
		$cookies.remove("token");
		$location.url("/welcome");
	}

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	var job_id;
	$scope.showMessages = function(pending_id, _job_id) {
		job_id = _job_id;
		socket.emit('subscribe', pending_id);		
		
		messagesFactory.show(pending_id, function(data) {
			if (data.errors) {
				$scope.error = "Could not load conversation. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}
			}
			else {
				$scope.new_message.pending_id = pending_id;
				$scope.messages = data;
				$timeout(function() {
					var _ = document.getElementsByClassName("div_chat")[1];
					_.scrollTop = _.scrollHeight;				
				}, 0, false);
			}
		});
	}

	$scope.createMessage = function() {
		socket.emit('send', {
			room: $scope.new_message.pending_id,
			sender: $scope.new_message.sender,
			message: $scope.new_message.message,
			created_at: new Date()
		});

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
		jobsFactory.show(job_id, function(data) {
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
});
