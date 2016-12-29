app.controller('settingsController',function ($scope, $location, $routeParams, usersFactory, truckersFactory){
  //////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
    var factory;
		$scope.tab = 'profile';
		if ($scope.user_type == 'user')
      factory = usersFactory;
    else
      factory = truckersFactory;

    factory.show($scope.id, function(data){
			for (var i = 0; i < data.jobs.length; i++)
				data.jobs[i].src = data.jobs[i].dirt_type.toLowerCase().replace(" - ", "_").replace(" ",  "_");

			$scope.jobs = data.jobs;
			$scope.user = data.user;
      console.log(data);
    });
	}
	else
		$location.url('/welcome');
	$scope.errors = null;
	$scope.updateUser = function(){
		data = {
			first_name:	$scope.user.first_name,
			last_name:	$scope.user.last_name,
		};
		if($scope.user_type == 'trucker'){
			data['make'] = $scope.user.make;
			data['model'] = $scope.user.model;
			data['year'] = $scope.user.year;
		}
		factory.update(data, function(data){
			console.log(data);
		});
	};

	$scope.updatePassword = function(){
		factory.login($scope.user, function(data) {
			if (data.errors)
				for (key in data.errors) {
					$scope.error = data.errors[key].message;
					break;
				}
			else {
				// update password
				if ($scope.user.new == $scope.user.confirm)
					console.log("success");
				else {
					$scope.error = "Passwords are not matching"
				}
			}
		});
	};
});
