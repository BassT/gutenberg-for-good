'use strict';

/* Controllers */

angular.module('gutenberg.controllers', ['ui.bootstrap'])
  
	/* Main controller
			- Controller for the whole ngView in index.html
			- Parent scope for others */
  .controller('ViewCtrl', ['$scope', function($scope) {
  	
  	$scope.$on("typingChangedEmit", function() {
  		console.log("Received typingChangedEmit and broadcasted typingChangedBroadcast");
  		$scope.$broadcast("typingChangedBroadcast"); // broadcast down that someone clicked a typing control button 
  	});

  }])

	/* Typing controller
			- Controls for the start/stop typing buttons of our lovely monkeys
			- Can we use this for every monkey?	*/
  .controller('TypingCtrl', ['$scope', 'Typing', function($scope, Typing) {

  	$scope.clicked = function(value) {
  		console.log("Emitted typingChangedEmit");
  		Typing.set(value);
  		$scope.$emit("typingChangedEmit");  // emit up that someone clicked a typing control button
  	}; 

  }])

  /* Straightforward monkey controller
  		- Generates random characters from our defined alphabet
  		- A stupid controller...eh... monkey */
  .controller('StraightforwardMonkey', ['$scope', 'Alphabet', 'Typing', function($scope, Alphabet, Typing) {
  	
  	$scope.text = ""; //initialize emtpy text

  	var timer = {};

		$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
			console.log("Received typingChangedBroadcast");
			console.log(Typing);
			if(Typing.start){ // monkey, work!
				timer = window.setInterval( function() {
					var rand = Math.floor(Math.random() * Alphabet.length);
					$scope.text += Alphabet[rand];
					}, 100);
			} else {
				clearInterval(timer);
			}
		});

  }]);