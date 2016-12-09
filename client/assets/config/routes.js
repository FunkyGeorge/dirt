var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/welcome',{
		templateUrl: 'partials/welcome.html',
		controller: 'welcomeController'		
	})
	.when('/register/:user_type?',{
		templateUrl: 'partials/register.html',
		controller: 'registerController'
	})
	.when('/login/:user_type',{
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
	.when('/messages',{
		templateUrl: 'partials/messages.html',
		controller: 'messagesController'
	})
	.otherwise({
		redirectTo: '/welcome'
	});
});
