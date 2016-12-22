var app = angular.module('app', ['ngRoute', 'ngCookies', 'infinite-scroll', 'angularMoment']);

app.config(function ($routeProvider, $locationProvider) {
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
	// $locationProvider
	// .html5Mode(true);
});

app.run(function($rootScope) {
	$rootScope.logout = function() {
		document.cookie = "ronin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		payload = null;
		ronin_token = null;
		location.href = ("/#/welcome");
	};
});