/*
     ===============
     Second-order monkey controller
     ===============
     - Generates characters from a Second-order monkey
     - Takes an array which represents the Second-order analysis of
     a text from project gutenberg as input for the monkey */
angular.module("gutenberg.controllers")
.controller("Second-orderMonkey", ["$scope", "$interval", "Typing", "myFunctions", "AnalysisFactory", "Alphabet", 'Monkeys', function($scope, $interval, Typing, myFunctions, AnalysisFactory, Alphabet, Monkeys) {

	$scope.text = Monkeys.monkeys[2].text; //initialize emtpy text

	this.timer = undefined;
	var character = "";
	var previousTypedChars = "";
	var matrix = AnalysisFactory.secondOrderMatrix;

	$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
		console.log("Received typingChangedBroadcast");
		console.log(Typing);

		if(Typing.start){ // monkey, work!
			if(!angular.isDefined(this.timer)) {
				timer = $interval( function() {
					matrix = AnalysisFactory.secondOrderMatrix;

					/* ================================
                         Start character generation - the tricky party - >>>> can we move this to myFunctions? <<<<
                         ================================ */

					previousTypedChars = $scope.text.slice(-1); // get the last two typed characters

					// set up slice matrix
					var matrixSlice = new Array(2);
					matrixSlice[0] = new Array(Math.pow(Alphabet.length,2));
					matrixSlice[1] = new Array(Math.pow(Alphabet.length,2));
					for (var i = matrixSlice[0].length - 1; i >= 0; i--) {
						matrixSlice[0][i] = undefined;
						matrixSlice[1][i] = undefined;
					};

					// slice the to the part of third-order characters that start with the previous two typed characters
					var insertAt = 0;
					var freqTotal = 0;
					for (var i = matrix[0].length - 1; i >= 0; i--) {
						if(previousTypedChars === matrix[0][i].substring(0,1)){ // check if current char matrix element starts with the correct chars
							insertAt                 = matrixSlice[0].indexOf(undefined); // find spot to insert this item
							matrixSlice[0][insertAt] = matrix[0][i]; // copy third-order char
							matrixSlice[1][insertAt] = matrix[1][i]; // copy frequencey
							freqTotal                += matrix[1][i]; // increase sum of frequencies
						}
					};

					// generate a random number between 0 and the total of frequencies
					var rand = Math.floor(Math.random()*freqTotal);

					// find the next char: sum the frequencies until they exceed rand and take that character
					var indexNextChar = 0;
					var freqSum = matrixSlice[1][0];
					while(freqSum < rand){
						indexNextChar++;
						freqSum += matrixSlice[1][indexNextChar];
					}

					if(matrixSlice[0][indexNextChar] !== undefined) {
						character = matrixSlice[0][indexNextChar].slice(1); // take the last character of the duo as the next character
					} else {
						// if he somehow tpyed himself to a dead end, just start over
						character = matrix[0][Math.floor(Math.random()*matrix[0].length)].slice(0,1);
					}

					/* ================================
                         End character generation
                         ================================ */

					$scope.text += character; // add actual next character to text
					myFunctions.checkForWord(character, "second-order");
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