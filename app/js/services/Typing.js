/**
 * Typing factory
 * 
 * This factory just holds the the typing state (typing or not typing)
 * and the speed, how fast the monkey is typing.
 * 
 */

angular.module('gutenberg.services')
.factory("Typing", function() { 

	console.log("Typing ready");

	var Typing = {};

	Typing.start = false;
	Typing.speed = 10;

	Typing.setStart = function(value) {
		this.start = value;
	};

	Typing.setSpeed = function(value) {
		this.speed = value;
	};

	return Typing;

});