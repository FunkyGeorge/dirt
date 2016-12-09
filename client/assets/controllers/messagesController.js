app.controller('messagesController', function ($scope, $location, $cookies, $routeParams, pendingsFactory, messagesFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'contractor';
		$scope.new_message = {sender: 'truck_type' in payload ? 1 : 0};
		$scope.error = null;
		pendingsFactory.index(function(data) {
			if (data.errors)
				$scope.error = "Something went wrong, please wait a while and try reloading.";
			else
				$scope.pendings = data;
		});
	}
	else
		$location.url('/welcome');

	$scope.logout = function() {
		$cookies.remove('token');
		$location.url('/welcome');
	}	

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(pending_id) {
		messagesFactory.show(pending_id, function(data) {
			if (data.errors) {
				$scope.error = "Could not load conversation. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}							
			}
			else
				$scope.messages = data;
		});
	}

	$scope.createMessage = function(pending_id) {
		$scope.new_message.pending_id = pending_id;
		messagesFactory.create($scope.new_message, function(data) {
			if (data.errors) {
				$scope.error = "Could not send message. "
				for (key in data.errors) {
					$scope.error += data.errors[key].message;
					break;
				}							
			}
			else
				$scope.messages = data;
		});
	}	
});
