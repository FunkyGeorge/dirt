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
});
