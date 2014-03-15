/*
     ===============
     Straightforward monkey controller
     ===============
     - Generates random characters from our defined alphabet
     - A stupid controller...eh... monkey */
angular.module("gutenberg.controllers")
.controller('StraightforwardMonkey', ['$scope', '$interval', 'Alphabet', 'Typing', 'myFunctions', 'Monkeys', function($scope, $interval, Alphabet, Typing, myFunctions, Monkeys) {

	$scope.text = Monkeys.monkeys[0].text; //initialize emtpy text

	this.timer = undefined;
	this.character = "";

	$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
		console.log("Received typingChangedBroadcast");
		console.log(Typing);

		if(Typing.start){ // monkey, work!
			if(!angular.isDefined(this.timer)) {
				timer = $interval( function() {
					var rand = Math.floor(Math.random() * Alphabet.length); // get index of next character randomly
					this.character = Alphabet[rand];
					$scope.text += this.character; // add actual next character to text
					myFunctions.checkForWord(this.character, "straightforward");
					$scope.$emit("TypedCharacterEmit");
				}, Typing.speed);
			}
		} else { // monkey, stop!
			if(angular.isDefined(this.timer)) {
				$interval.cancel(this.timer);
				this.timer = undefined;
			}
		}
	});

}]);