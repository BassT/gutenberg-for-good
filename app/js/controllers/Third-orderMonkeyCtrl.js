/*
     ===============
     Third-order monkey controller
     ===============
     - Generates characters from a third-order monkey
     - Takes an array which represents the third-order analysis of
     a text from project gutenberg as input for the monkey */
angular.module("gutenberg.controllers")
.controller("Third-orderMonkey", ["$scope", "$interval", "Typing", "myFunctions", "AnalysisFactory", "Alphabet", 'Monkeys', function($scope, $interval, Typing, myFunctions, AnalysisFactory, Alphabet, Monkeys) {

	$scope.text = Monkeys.monkeys[3].text; //initialize emtpy text

	var timer = {};
	var character = "";
	var twoPreviousTypedChars = "";
	var matrix = AnalysisFactory.thirdOrderMatrix;

	$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
		console.log("Received typingChangedBroadcast");
		console.log(Typing);

		if(Typing.start){ // monkey, work!
			if(!angular.isDefined(timer)) {
				timer = $interval( function() {
					matrix = AnalysisFactory.thirdOrderMatrix;
					/* ================================
                         Start character generation - the tricky party - >>>> can we move this to myFunctions? <<<<
                         ================================ */

					twoPreviousTypedChars = $scope.text.slice(-2); // get the last two typed characters

					// set up slice matrix
					var matrixSlice = new Array(2);
					matrixSlice[0] = new Array(Alphabet.length);
					matrixSlice[1] = new Array(Alphabet.length);
					for (var i = matrixSlice[0].length - 1; i >= 0; i--) {
						matrixSlice[0][i] = undefined;
						matrixSlice[1][i] = undefined;
					};

					// slice the to the part of third-order characters that start with the previous two typed characters
					var insertAt = 0;
					var freqTotal = 0;
					for (var i = matrix[0].length - 1; i >= 0; i--) {
						if(twoPreviousTypedChars === matrix[0][i].substring(0,2)){ // check if current char matrix element starts with the correct chars
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
						character = matrixSlice[0][indexNextChar].slice(2); // take the last character of the trio as the next character
					} else {
						// if he somehow tpyed himself to a dead end, just start over
						character = matrix[0][Math.floor(Math.random()*matrix[0].length)].slice(0,2);
					}

					/* ================================
                         End character generation
                         ================================ */

					$scope.text += character; // add actual next character to text
					myFunctions.checkForWord(character, "third-order");
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