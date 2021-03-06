var app = angular.module("app", ["ngRoute", "ngCookies", "infinite-scroll", "angularMoment", "stripe.checkout"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "partials/index.html",
		controller: "indexController"
	})
	.when("/welcome",{
		templateUrl: "partials/welcome.html",
		controller: "welcomeController"
	})
	.when("/about",{
		templateUrl: "partials/about.html"
	})
	.when("/register",{
		templateUrl: "partials/register.html",
		controller: "registerController"
	})
	.when("/login",{
		templateUrl: "partials/login.html",
		controller: "loginController"
	})
	.when('/settings',{
		templateUrl: 'partials/settings.html',
		controller: 'settingsController'
	})
	.when('/jobs',{
		templateUrl: 'partials/jobs.html',
		controller: 'jobsController'
	})
	.when("/jobs/:id",{
		templateUrl: "partials/jobs_show.html",
		controller: "jobsShowController"
	})
	.when('/jobs/edit/:id',{
		templateUrl: 'partials/jobs.html',
		controller: 'jobsController'
	})
	.when("/messages/:id?",{
		templateUrl: "partials/messages.html",
		controller: "messagesController"
	})
	.when("/invoices",{
		templateUrl: "partials/invoices.html",
		controller: "invoicesController"
	})
	.otherwise({
		redirectTo: "/welcome"
	});
});
