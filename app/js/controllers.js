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

  	$scope.typing = "stop";

  	$scope.clicked = function(value) {
  		console.log("Emitted typingChangedEmit");
  		Typing.setStart(value);
  		$scope.$emit("typingChangedEmit");  // emit up that someone clicked a typing control button
  	}; 

  }])

  /* Straightforward monkey controller
  		- Generates random characters from our defined alphabet
  		- A stupid controller...eh... monkey */
  .controller('StraightforwardMonkey', ['$scope', '$interval', 'Alphabet', 'Typing', 'myFunctions', 'Monkeys', function($scope, $interval, Alphabet, Typing, myFunctions, Monkeys) {
  	
  	$scope.text = Monkeys.monkeys[0].text; //initialize emtpy text

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

	/* First-oder monkey controller
			- Generates characters from a first-order monkey
			- Takes an array which represents the first-order analysis
				of a text from project gutenber as input for the monkey */
	.controller("First-orderMonkey", ["$scope", "$interval", "Typing", "myFunctions", "AnalysisFactory", "Alphabet", "Monkeys", function($scope, $interval, Typing, myFunctions, AnalysisFactory, Alphabet, Monkeys) {

				$scope.text = Monkeys.monkeys[1].text; //initialize emtpy text

		  	var timer = {};
		  	var word = "";
		  	var character = "";
		  	var matrix = AnalysisFactory.firstOrderMatrix;

				$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
					console.log("Received typingChangedBroadcast");
					console.log(Typing);

					if(Typing.start){ // monkey, work!
						if(!angular.isDefined(timer)) {
							matrix = AnalysisFactory.firstOrderMatrix;
							timer = $interval( function() {
								
								/* ================================
										Start character generation - the tricky party - >>>> can we move this to myFunctions? <<<<
									 ================================ */
								var freqTotal = 0;
								for (var i = matrix[1].length - 1; i >= 0; i--) {
									freqTotal += matrix[1][i];
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

								if(matrix[0][indexNextChar] !== undefined) {
								  var character = matrix[0][indexNextChar]; // take the last character of the trio as the next character
								} else {
								  // if he somehow tpyed himself to a dead end, just start over
								  var character = matrix[0][Math.floor(Math.random()*matrix[0].length)]; 
								}

								/* ================================
										End character generation
									 ================================ */

								$scope.text += character; // add actual next character to text
								myFunctions.checkForWord(character, "first-order");
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
	
	/* Second-order monkey controller
			- Generates characters from a Second-order monkey
			- Takes an array which represents the Second-order analysis of
				a text from project gutenberg as input for the monkey */
	.controller("Second-orderMonkey", ["$scope", "$interval", "Typing", "myFunctions", "AnalysisFactory", "Alphabet", 'Monkeys', function($scope, $interval, Typing, myFunctions, AnalysisFactory, Alphabet, Monkeys) {

		$scope.text = Monkeys.monkeys[2].text; //initialize emtpy text

  	var timer = {};
  	var word = "";
  	var character = "";
  	var previousTypedChars = "";
  	var matrix = AnalysisFactory.secondOrderMatrix;

		$scope.$on("typingChangedBroadcast", function() { // receive event that someone clicked a typing control button
			console.log("Received typingChangedBroadcast");
			console.log(Typing);

			if(Typing.start){ // monkey, work!
				if(!angular.isDefined(timer)) {
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
						  var character = matrixSlice[0][indexNextChar].slice(1); // take the last character of the duo as the next character
						} else {
						  // if he somehow tpyed himself to a dead end, just start over
						  var character = matrix[0][Math.floor(Math.random()*matrix[0].length)].slice(0,1); 
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
				if(angular.isDefined(timer)) {
					$interval.cancel(timer);
					timer = undefined;
				}
			}
		});

	}])

	/* Third-order monkey controller
			- Generates characters from a third-order monkey
			- Takes an array which represents the third-order analysis of
				a text from project gutenberg as input for the monkey */
	.controller("Third-orderMonkey", ["$scope", "$interval", "Typing", "myFunctions", "AnalysisFactory", "Alphabet", 'Monkeys', function($scope, $interval, Typing, myFunctions, AnalysisFactory, Alphabet, Monkeys) {

		$scope.text = Monkeys.monkeys[3].text; //initialize emtpy text

  	var timer = {};
  	var word = "";
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
						  var character = matrixSlice[0][indexNextChar].slice(2); // take the last character of the trio as the next character
						} else {
						  // if he somehow tpyed himself to a dead end, just start over
						  var character = matrix[0][Math.floor(Math.random()*matrix[0].length)].slice(0,2); 
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

	}])

	/* Evaluation controller
			- controls the evaluation panel of the monkey problems */
	.controller("EvaluationCtrl", ["$scope", "Monkeys", function($scope, Monkeys) {

		$scope.monkeys = Monkeys.monkeys;

		/* =============
				Personal note: This actually works! I didn't expect that.
				Apparently $scope.$watch acts like an observer: Once it is
				"attached" to some varible it will be triggered whenever the
				expression is met. Cool stuff.
		   ============= */

		for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
			$scope.$watch("Monkeys.monkeys[" + i + "].fakeWords", function(newVal, oldVal, scope) {
				if(newVal !== undefined) {
					$scope.monkeys[i].fakeWords = newVal;
				}
			});
			$scope.$watch("Monkeys.monkeys[" + i + "].actualWords", function(newVal, oldVal, scope) {
				if(newVal !== undefined) {
					$scope.monkeys[i].actualWords = newVal;
				}
			});
		};

	}])

	/* 
	=====================
	Text analyzer control
	=====================
		- triggers the text analysis of some factory for monkeys 
		- triggers computation of corr. matrices
	*/
	.controller("TextAnalyzerCtrl", ["$scope", "GutenbergTextFactory", "AnalysisFactory", "$q", function($scope, GutenbergTextFactory, AnalysisFactory, $q) {

		$scope.selectedBook = {};
		$scope.textComputeButton = "Compute correlation matrix";
		$scope.textLoadTextButton = "Load text";

		$scope.analyzeText = function(order) {

			var defferedObj = $q.defer();

			AnalysisFactory.analyzeText(GutenbergTextFactory.text, parseInt(order), defferedObj);

			return defferedObj.promise;

		};

		$scope.loadText = function(url) {
			GutenbergTextFactory.getTxt(url);
		};

		$scope.requestTexts = function(query) {
			return GutenbergTextFactory.getTxtURL(query);
		};

		$scope.computeCorr = function() {
			
			var defferedObj = $q.defer();

			AnalysisFactory.computeCorr(GutenbergTextFactory.text, 1, defferedObj, false);
			AnalysisFactory.computeCorr(GutenbergTextFactory.text, 2, defferedObj, false);
			AnalysisFactory.computeCorr(GutenbergTextFactory.text, 3, defferedObj, false);

			return defferedObj.promise;
			
		};

	}])

	/* 
	=====================
	Correlation matrix control
	=====================
		- outputs the correlation matrix 
	*/
	.controller('CorrMatrixCtrl', ['AnalysisFactory', '$scope', function(AnalysisFactory, $scope){



		$scope.characters = [];

		$scope.get = function(query) {
			var tempNames = AnalysisFactory.getNames(query.length + 1);
			var tempFreqs = AnalysisFactory.getFreqs(query.length + 1);
			var totalFreq = 0;
			var result = [];
			for (var i = tempFreqs.length - 1; i >= 0; i--) {
				totalFreq += tempFreqs[i];
			};
			for (var i = tempFreqs.length - 1; i >= 0; i--) {
				result.push({ name: tempNames[i], freq: (tempFreqs[i]/totalFreq + 0.0)});
			};
			return result;
		};

	}]);