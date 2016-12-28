app.controller('profileController',function ($scope, $location, $routeParams, usersFactory, truckersFactory){
  //////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
    var factory;
		if ($scope.user_type == 'user')
      factory = usersFactory;
    else
      factory = truckersFactory;

    factory.show($scope.id, function(data){
      // $scope.first_name = data.first_name;
      // $scope.last_name = data.last_name;
      console.log(data);
    });
	}
	else
		$location.url('/welcome');
});
