/* 
 * Word factory
 * 
 * This factory holds all the words from the Ubuntu dictonary. 
 */

angular.module('gutenberg.services')
.factory("WordFactory", ['$http', function($http) {

	var WordFactory = {};

	WordFactory.words;

	$http.get("res/british-english.txt")
	.success(function(data, status, header, config) {
		WordFactory.words = data.split("\n");
	});

	return WordFactory;
}]);