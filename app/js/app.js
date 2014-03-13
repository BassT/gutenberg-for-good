'use strict';

// Declare app level module which depends on filters, and services
angular.module('gutenberg', [
  'ngRoute',
  'gutenberg.filters',
  'gutenberg.services',
  'gutenberg.directives',
  'gutenberg.controllers',
  'ui.bootstrap'
])
	.config( function($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "partials/home.html"
			})
			.when("/straightforward", {
				templateUrl: "partials/straightforward.html"
			})
			.when("/first-order", {
				templateUrl: "partials/first-order.html"
			})
			.when("/second-order", {
				templateUrl: "partials/second-order.html"
			})
			.when("/third-order", {
				templateUrl: "partials/third-order.html"
			})
			.when("/corr-matrices", {
				templateUrl: "partials/corr-matrices.html"
			})
			.otherwise({
				redirectTo: "/home"
			});
	});
