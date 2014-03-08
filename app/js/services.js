'use strict';

/* Services */
angular.module('gutenberg.services', [])
	
	/* Alphabet value
			This value just holds all the characters of the alphabet
			we're considering. */
	.value("Alphabet", ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',"'",' ',',','.',';',':','?','!','(',')','-',"@",'"','#'])
	
	/* Words factory
			This factory holds all the words from the Ubuntu dictonary. */
	.factory("WordFactory", ['$http', function($http) {
		
		var WordFactory = {};

		WordFactory.words;

		$http.get("res/british-english.txt")
			.success(function(data, status, header, config) {
				WordFactory.words = data.split("\n");
			});

		return WordFactory;
	}])

	/* Typing factory
			This factory just holds the the typing state (typing or not typing)
			and the speed, how fast the monkey is typing. */
	.factory("Typing", function() { 
		
		console.log("Typing ready");

		var Typing = {};

		Typing.start = false;
		Typing.speed = 50;

		Typing.setStart = function(value) {
			this.start = value;
		};

		Typing.setSpeed = function(value) {
			this.speed = value;
		};

		return Typing;

	})


	/* Monkey factory
			This factory stores the evalution results for straightforward,
			first-order and second-order monkeys. */
	.factory("Monkeys", function() {

		var Monkeys = {};

		Monkeys.monkeys = [
			{
				name: "straightforward",
				fakeWords: 0,
				actualWords: 0
			},
			{
				name: "first-order",
				fakeWords: 0,
				actualWords: 0
			},
			{
				name: "second-order",
				fakeWords: 0,
				actualWords: 0
			},
			{
				name: "third-order",
				fakeWords: 0,
				actualWords: 0
			}
		];

		Monkeys.addFakeWord = function(name){
			for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
				if (Monkeys.monkeys[i].name === name){
					Monkeys.monkeys[i].fakeWords++;
				}
			};		
		}

		Monkeys.addActualWord = function(name){
			for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
				if (Monkeys.monkeys[i].name === name){
					Monkeys.monkeys[i].actualWords++;
				}
			};
		}

		return Monkeys;

	})


	.factory("AnalysisFactory", ["Alphabet", function(Alphabet) {

		var AnalysisFactory = {};

		AnalysisFactory.analyzeText = function(text, order) {
			if (order === 1) {

				if(AnalysisFactory.firstOrderMatrix === undefined) {
					AnalysisFactory.firstOrderMatrix = new Array(2);
					AnalysisFactory.firstOrderMatrix[0] = new Array(Alphabet.length);
					AnalysisFactory.firstOrderMatrix[1] = new Array(Alphabet.length);
					for (var i = AnalysisFactory.firstOrderMatrix[0] - 1; i >= 0; i--) {
						AnalysisFactory.firstOrderMatrix[0] = undefined;
						AnalysisFactory.firstOrderMatrix[1] = undefined;
					};
				}

				for (var i = text.length - 1; i >= 0; i--) {
					if(Alphabet.indexOf(text[i]) != -1) { // check if characters are in our alphabet
		        c = text[i];
		        index = AnalysisFactory.firstOrderMatrix[0].indexOf(c);
		        if(index !== -1){ // this second-order character is already in the array
		          AnalysisFactory.firstOrderMatrix[1][index]++; // increase frequency of this second-order character
		        } else { // this second-order character isn't in our array yet
		          insertAt = AnalysisFactory.firstOrderMatrix[0].indexOf(undefined); // find first empty cell
		          AnalysisFactory.firstOrderMatrix[0][insertAt] = c; // insert second-order character
		          AnalysisFactory.firstOrderMatrix[1][insertAt] = 1; // set frequency to 1 for this second-order character
		        }
	      	}
				}

				// remove unnecassary "undefined" columns
				AnalysisFactory.firstOrderMatrix[0] = AnalysisFactory.firstOrderMatrix[0].slice(0, insertAt + 1);
				AnalysisFactory.firstOrderMatrix[1] = AnalysisFactory.firstOrderMatrix[1].slice(0, insertAt + 1);

			} else if (order === 2) {

				if(AnalysisFactory.secondOrderMatrix === undefined) {
					AnalysisFactory.secondOrderMatrix = new Array(2);
					AnalysisFactory.secondOrderMatrix[0] = new Array(Math.pow(Alphabet.length,2));
					AnalysisFactory.secondOrderMatrix[1] = new Array(Math.pow(Alphabet.length,2));
					for (var i = AnalysisFactory.secondOrderMatrix[0] - 1; i >= 0; i--) {
						AnalysisFactory.secondOrderMatrix[0][i] = undefined;
						AnalysisFactory.secondOrderMatrix[1][i] = undefined;
					};
				}

				for (var i = text.length - 1; i >= 0; i--) {
					if(Alphabet.indexOf(text[i]) != -1 && Alphabet.indexOf(text[i-1]) != -1) { // check if characters are in our alphabet
		        c = text[i-1] + text[i];
		        index = AnalysisFactory.secondOrderMatrix[0].indexOf(c);
		        if(index !== -1){ // this second-order character is already in the array
		          AnalysisFactory.secondOrderMatrix[1][index]++; // increase frequency of this second-order character
		        } else { // this second-order character isn't in our array yet
		          insertAt = AnalysisFactory.secondOrderMatrix[0].indexOf(undefined); // find first empty cell
		          AnalysisFactory.secondOrderMatrix[0][insertAt] = c; // insert second-order character
		          AnalysisFactory.secondOrderMatrix[1][insertAt] = 1; // set frequency to 1 for this second-order character
		        }
	      	}
				}

				// remove unnecassary "undefined" columns
				AnalysisFactory.secondOrderMatrix[0] = AnalysisFactory.secondOrderMatrix[0].slice(0, insertAt + 1);
				AnalysisFactory.secondOrderMatrix[1] = AnalysisFactory.secondOrderMatrix[1].slice(0, insertAt + 1);

			} else if (order === 3) {

				if(AnalysisFactory.thirdOrderMatrix === undefined) {
					AnalysisFactory.thirdOrderMatrix = new Array(2);
					AnalysisFactory.thirdOrderMatrix[0] = new Array(Math.pow(Alphabet.length,3));
					AnalysisFactory.thirdOrderMatrix[1] = new Array(Math.pow(Alphabet.length,3));
					for (var i = AnalysisFactory.thirdOrderMatrix[0] - 1; i >= 0; i--) {
						AnalysisFactory.thirdOrderMatrix[0][i] = undefined;
						AnalysisFactory.thirdOrderMatrix[1][i] = undefined;
					};
				}

				for (var i = text.length - 1; i >= 0; i--) {
					if(Alphabet.indexOf(text[i]) != -1 && Alphabet.indexOf(text[i-1]) != -1 && Alphabet.indexOf(text[i-2]) != -1) { // check if characters are in our alphabet
		        c = text[i-2] + text[i-1] + text[i];
		        index = AnalysisFactory.thirdOrderMatrix[0].indexOf(c);
		        if(index !== -1){ // this second-order character is already in the array
		          AnalysisFactory.thirdOrderMatrix[1][index]++; // increase frequency of this second-order character
		        } else { // this second-order character isn't in our array yet
		          insertAt = AnalysisFactory.thirdOrderMatrix[0].indexOf(undefined); // find first empty cell
		          AnalysisFactory.thirdOrderMatrix[0][insertAt] = c; // insert second-order character
		          AnalysisFactory.thirdOrderMatrix[1][insertAt] = 1; // set frequency to 1 for this second-order character
		        }
	      	}
				}

				// remove unnecassary "undefined" columns
				AnalysisFactory.thirdOrderMatrix[0] = AnalysisFactory.thirdOrderMatrix[0].slice(0, insertAt + 1);
				AnalysisFactory.thirdOrderMatrix[1] = AnalysisFactory.thirdOrderMatrix[1].slice(0, insertAt + 1);
			}
			
		};

		return AnalysisFactory;

	}]);

	/* myFunctions Factory
			This factory contains custom functions, which 
			can be used in different controllers */
	.factory("myFunctions", ['WordFactory', 'Monkeys', function(WordFactory, Monkeys){

		console.log("myFunctions ready");

		var myFunctions = {};

		var word = "";

		/* checkForWord function
				checks if the new character yielded another word
				and further checks if the word is actually an
				english word */
		myFunctions.checkForWord = function(character, monkey) {
			if((character === " " || character === "!" || character === "?" || character === "," || character === "." || character === "\"" || character === "\'") && word !== ""){ 
				// we finished another word
				if(WordFactory.words.indexOf(word) !== -1) {
					Monkeys.addActualWord(monkey);
				} else {
					Monkeys.addFakeWord(monkey);
				}
				word = ""; // reset word
			} else {
				// word not finished yet
				word += character;
			}
		};

		return myFunctions;

	}]);