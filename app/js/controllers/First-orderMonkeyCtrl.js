/*
     ===============
     First-oder monkey controller
     ===============
     - Generates characters from a first-order monkey
     - Takes an array which represents the first-order analysis
     of a text from project gutenber as input for the monkey */
angular.module("gutenberg.controllers")
.controller("First-orderMonkey", ["$scope", "$interval", "Typing", "myFunctions", "AnalysisFactory", "Alphabet", "Monkeys", function($scope, $interval, Typing, myFunctions, AnalysisFactory, Alphabet, Monkeys) {

	$scope.text = Monkeys.monkeys[1].text; //initialize empty text

	this.timer = undefined;
	this.character = "";
	this.matrix = AnalysisFactory.firstOrderMatrix;

	$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
		console.log("Received typingChangedBroadcast");
		console.log(Typing);

		if(Typing.start){ // monkey, work!
			if(!angular.isDefined(this.timer)) {
				this.matrix = AnalysisFactory.firstOrderMatrix;
				timer = $interval( function() {

					/* ================================
                         Start character generation - the tricky party - >>>> can we move this to myFunctions? <<<<
                         ================================ */
					var freqTotal = 0;
					for (var i = this.matrix[1].length - 1; i >= 0; i--) {
						freqTotal += this.matrix[1][i];
					};

					// generate a random number between 0 and the total of frequencies
					var rand = Math.floor(Math.random()*freqTotal);

					// find the next char: sum the frequencies until they exceed rand and take that character
					var indexNextChar = 0;
					var freqSum = matrix[1][0];
					while(freqSum < rand){
						indexNextChar++;
						freqSum += matrix[1][indexNextChar];
					}

					if(this.matrix[0][indexNextChar] !== undefined) {
						this.character = this.matrix[0][indexNextChar]; // take the last character of the trio as the next character
					} else {
						// if he somehow tpyed himself to a dead end, just start over
						this.character = this.matrix[0][Math.floor(Math.random()*matrix[0].length)];
					}

					/* ================================
                         End character generation
                         ================================ */

					$scope.text += this.character; // add actual next character to text
					myFunctions.checkForWord(this.character, "first-order");
					$scope.$emit("TypedCharacterEmit");
				}, Typing.speed);
			}
		} else { // monkey, stop!
			if(angular.isDefined(this.timer)) {
				$interval.cancel(this.timer);
				timer = undefined;
			}
		}
	});

}]);