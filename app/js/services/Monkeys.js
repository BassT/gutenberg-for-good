/**
 * Monkeys factory
 * 
 * This factory stores the evalution results for straightforward,
 * first-order and second-order monkeys. 
 */

angular.module('gutenberg.services')
.factory("Monkeys", function() {

	var Monkeys = {};

	Monkeys.monkeys = [
	                   {
	                	   name: "straightforward",
	                	   fakeWords: 0,
	                	   actualWords: 0,
	                	   text: "",
	                	   max: 0
	                   },
	                   {
	                	   name: "first-order",
	                	   fakeWords: 0,
	                	   actualWords: 0,
	                	   max: 0,
	                	   text: ""
	                   },
	                   {
	                	   name: "second-order",
	                	   fakeWords: 0,
	                	   actualWords: 0,
	                	   max: 0,
	                	   text: ""
	                   },
	                   {
	                	   name: "third-order",
	                	   fakeWords: 0,
	                	   actualWords: 0,
	                	   max: 0,
	                	   text: ""
	                   }
	                   ];

	Monkeys.addFakeWord = function(name){
		for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
			if (Monkeys.monkeys[i].name === name){
				Monkeys.monkeys[i].fakeWords++;
			}
		};		
	};

	Monkeys.addActualWord = function(name){
		for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
			if (Monkeys.monkeys[i].name === name){
				Monkeys.monkeys[i].actualWords++;
			}
		};
	};

	Monkeys.addCharacter = function(character, name) {
		for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
			if (Monkeys.monkeys[i].name === name){
				Monkeys.monkeys[i].text += character;
			}
		};
	};

	Monkeys.setMax = function(wordLength, name) {
		for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
			if (Monkeys.monkeys[i].name === name){
				if(Monkeys.monkeys[i].max < wordLength) {
					Monkeys.monkeys[i].max = wordLength;
				}
			}
		};
	};

	return Monkeys;

});