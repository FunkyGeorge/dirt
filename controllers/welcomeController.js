app.controller('welcomeController', function ($location, $cookies) {
	if ($cookies.get('token'))
		$location.url('/');
});
