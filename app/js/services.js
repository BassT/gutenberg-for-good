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