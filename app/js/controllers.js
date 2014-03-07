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

  	$scope.$on("TypedCharacterEmit", function() {
  		$scope.$broadcast("TypedCharacterBroadcast");
  	})

  }])

	/* Typing controller
			- Controls for the start/stop typing buttons of our lovely monkeys
			- Can we use this for every monkey?	*/
  .controller('TypingCtrl', ['$scope', 'Typing', function($scope, Typing) {

  	$scope.typing = { stop: true, start: false };

  	$scope.clicked = function(value) {
  		console.log("Emitted typingChangedEmit");
  		Typing.setStart(value);
  		$scope.$emit("typingChangedEmit");  // emit up that someone clicked a typing control button
  	}; 

  }])

  /* Straightforward monkey controller
  		- Generates random characters from our defined alphabet
  		- A stupid controller...eh... monkey */
  .controller('StraightforwardMonkey', ['$scope', '$interval', 'Alphabet', 'Typing', 'myFunctions', function($scope, $interval, Alphabet, Typing, myFunctions) {
  	
  	$scope.text = ""; //initialize emtpy text

  	var timer = {};
  	var word = "";
  	var character = "";

		$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
			console.log("Received typingChangedBroadcast");
			console.log(Typing);

			if(Typing.start){ // monkey, work!
				if(!angular.isDefined(timer)) {
					timer = $interval( function() {
						var rand = Math.floor(Math.random() * Alphabet.length); // get index of next character randomly
						character = Alphabet[rand];
						$scope.text += character; // add actual next character to text
						myFunctions.checkForWord(character, "straightforward");
						$scope.$emit("TypedCharacterEmit");
						}, Typing.speed);	
				}
			} else { // monkey, stop!
				if(angular.isDefined(timer)) {
					$interval.cancel(timer);
					timer = undefined;
				}
			}
		});

  }])


	.controller("EvaluationCtrl", ["$scope", "Monkeys", function($scope, Monkeys) {

		$scope.monkeys = Monkeys.monkeys;

		$scope.$watch("Monkeys.monkeys[0].fakeWords", function(newVal, oldVal, scope) {
			if(newVal !== undefined){
				$scope.monkeys[0].fakeWords = newVal;
				// $scope.monkeys[0].ratio = ($scope.monkeys[0].actualWords) / ($scope.monkeys[0].actualWords + $scope.monkeys[0].fakeWords);
			}
		});

		$scope.$watch("Monkeys.monkeys[0].actualWords", function(newVal, oldVal, scope) {
			if(newVal !== undefined){
				$scope.monkeys[0].actualWords = newVal;
				// $scope.monkeys[0].ratio = ($scope.monkeys[0].actualWords) / ($scope.monkeys[0].actualWords + $scope.monkeys[0].fakeWords);
			}
		});

		$scope.$watch("Monkeys.monkeys[1].fakeWords", function(newVal, oldVal, scope) {
			if(newVal !== undefined){
				$scope.monkeys[1].fakeWords = newVal;
				// $scope.monkeys[1].ratio = ($scope.monkeys[1].actualWords) / ($scope.monkeys[1].actualWords + $scope.monkeys[1].fakeWords);
			}
		});

		$scope.$watch("Monkeys.monkeys[1].actualWords", function(newVal, oldVal, scope) {
			if(newVal !== undefined){
				$scope.monkeys[1].actualWords = newVal;
				// $scope.monkeys[1].ratio = ($scope.monkeys[1].actualWords) / ($scope.monkeys[1].actualWords + $scope.monkeys[1].fakeWords);
			}
		});

	}]);