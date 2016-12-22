var app = angular.module('app', ['ngRoute', 'ngCookies', 'infinite-scroll', 'angularMoment']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/welcome',{
		templateUrl: 'partials/welcome.html',
		controller: 'welcomeController'
	})
	.when('/about',{
		templateUrl: 'partials/about.html'
	})
	.when('/register',{
		templateUrl: 'partials/register.html',
		controller: 'registerController'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.when('/jobs',{
		templateUrl: 'partials/jobs.html',
		controller: 'jobsController'
	})
	.when('/jobs/:id',{
		templateUrl: 'partials/jobs_show.html',
		controller: 'jobsShowController'
	})
	.when('/messages/:id?',{
		templateUrl: 'partials/messages.html',
		controller: 'messagesController'
	})
	.when('/invoices/:id?',{
		templateUrl: 'partials/invoices.html',
		controller: 'invoicesController'
	})
	.otherwise({
		redirectTo: '/welcome'
	});
});

app.run(function($rootScope) {
	$rootScope.setUser = function() {
		if(payload) {
			$rootScope.id = payload.id;
			$rootScope.name = payload.first_name + " " + payload.last_name;
			$rootScope.user_type = 'truck_type' in payload ? 'trucker' : 'user';
		}
	};
	$rootScope.setUser();

	$rootScope.logout = function() {
		// Disconnect from sockets:
		socket.emit("logout");
		
		// Destroy cookie:
		document.cookie = "ronin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		
		// Reset globals:
		payload = undefined;
		ronin_token = undefined;
		socket = undefined;
		$rootScope.id = undefined;
		$rootScope.name = undefined;
		$rootScope.user_type = undefined;
		
		// Relocate:
		location.href = ("/#/welcome");
	};
});