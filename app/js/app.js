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

			})
			.when("/straightforward", {

			})
			.when("/first-order", {

			})
			.when("/second-order", {

			})
			.when("/third-order", {

			})
			.otherwise({
				redirectTo: "/"
			});
	});
