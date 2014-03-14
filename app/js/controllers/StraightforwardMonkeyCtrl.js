/*
     ===============
     Straightforward monkey controller
     ===============
     - Generates random characters from our defined alphabet
     - A stupid controller...eh... monkey */
angular.module("gutenberg.controllers")
.controller('StraightforwardMonkey', ['$scope', '$interval', 'Alphabet', 'Typing', 'myFunctions', 'Monkeys', function($scope, $interval, Alphabet, Typing, myFunctions, Monkeys) {

	$scope.text = Monkeys.monkeys[0].text; //initialize emtpy text

	var timer = {};
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

}]);