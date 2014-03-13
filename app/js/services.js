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
		Typing.speed = 10;

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
		}

		Monkeys.addActualWord = function(name){
			for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
				if (Monkeys.monkeys[i].name === name){
					Monkeys.monkeys[i].actualWords++;
				}
			};
		}

		Monkeys.addCharacter = function(character, name) {
			for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
				if (Monkeys.monkeys[i].name === name){
					Monkeys.monkeys[i].text += character;
				}
			};
		}

		Monkeys.setMax = function(wordLength, name) {
			for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
				if (Monkeys.monkeys[i].name === name){
					if(Monkeys.monkeys[i].max < wordLength) {
						Monkeys.monkeys[i].max = wordLength;
					}
				}
			};
		}

		return Monkeys;

	})

	/* AnalysisFactory
			This factory contains the text analysis functions for a
			first-/second- or third-order monkey. */
	.factory("AnalysisFactory", ["Alphabet", function(Alphabet) {

		var AnalysisFactory = {};

		AnalysisFactory.computeCorr = function(text, order, defferedObj, skipFlag) {
			// TODO
			// copy from analyzeText and add flag to indicate if non-occurring
			// chars are being skipped or included in the matrices

			text = text.toLowerCase();

			/* ========================
					First-order monkey
				 ======================== */

			var c = undefined;
			var index = undefined;
			var insertAt = undefined;

			if (order === 1) { 

				AnalysisFactory.firstOrderMatrix = new Array(2);
				AnalysisFactory.firstOrderMatrix[0] = new Array(Alphabet.length);
				AnalysisFactory.firstOrderMatrix[1] = new Array(Alphabet.length);
				for (var i = AnalysisFactory.firstOrderMatrix[0].length - 1; i >= 0; i--) {
					AnalysisFactory.firstOrderMatrix[0][i] = undefined;
					AnalysisFactory.firstOrderMatrix[1][i] = undefined;
				};

				if(!skipFlag) { // we're not skipping non-occuring chars
					for (var i = Alphabet.length - 1; i >= 0; i--) { // first-order loop
						AnalysisFactory.firstOrderMatrix[0][i] = Alphabet[i];
						AnalysisFactory.firstOrderMatrix[1][i] = 0;
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
				if(skipFlag){
					AnalysisFactory.firstOrderMatrix[0] = AnalysisFactory.firstOrderMatrix[0].slice(0, insertAt + 1);
					AnalysisFactory.firstOrderMatrix[1] = AnalysisFactory.firstOrderMatrix[1].slice(0, insertAt + 1);
				}

			} 

			/* ========================
					Second-order monkey
				 ======================== */

			else if (order === 2) {

				AnalysisFactory.secondOrderMatrix = new Array(2);
				AnalysisFactory.secondOrderMatrix[0] = new Array(Math.pow(Alphabet.length,2));
				AnalysisFactory.secondOrderMatrix[1] = new Array(Math.pow(Alphabet.length,2));
				for (var i = AnalysisFactory.secondOrderMatrix[0].length - 1; i >= 0; i--) {
					AnalysisFactory.secondOrderMatrix[0][i] = undefined;
					AnalysisFactory.secondOrderMatrix[1][i] = undefined;
				};

				if(!skipFlag) { // we're not skipping non-occuring chars
					for (var i = Alphabet.length - 1; i >= 0; i--) { // first-order loop
						for (var j = Alphabet.length - 1; j >= 0; j--) {
							AnalysisFactory.secondOrderMatrix[0][i*Alphabet.length + j] = Alphabet[i] + Alphabet[j];
							AnalysisFactory.secondOrderMatrix[1][i*Alphabet.length + j] = 0;
						};
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
				if(skipFlag) {
					AnalysisFactory.secondOrderMatrix[0] = AnalysisFactory.secondOrderMatrix[0].slice(0, insertAt + 1);
					AnalysisFactory.secondOrderMatrix[1] = AnalysisFactory.secondOrderMatrix[1].slice(0, insertAt + 1);
				}

			} 

			/* ========================
					Third-order monkey
				 ======================== */

			else if (order === 3) {

				AnalysisFactory.thirdOrderMatrix = new Array(2);
				AnalysisFactory.thirdOrderMatrix[0] = new Array(Math.pow(Alphabet.length,3));
				AnalysisFactory.thirdOrderMatrix[1] = new Array(Math.pow(Alphabet.length,3));
				for (var i = AnalysisFactory.thirdOrderMatrix[0].length - 1; i >= 0; i--) {
					AnalysisFactory.thirdOrderMatrix[0][i] = undefined;
					AnalysisFactory.thirdOrderMatrix[1][i] = undefined;
				};

				if(!skipFlag) { // we're not skipping non-occuring chars
					for (var i = Alphabet.length - 1; i >= 0; i--) { // first-order loop
						for (var j = Alphabet.length - 1; j >= 0; j--) {
							for (var k = Alphabet.length - 1; k >= 0; k--) {
								AnalysisFactory.thirdOrderMatrix[0][i*Alphabet.length + j*Alphabet.length + k] = Alphabet[i] + Alphabet[j] + Alphabet[k];
								AnalysisFactory.thirdOrderMatrix[1][i*Alphabet.length + j*Alphabet.length + k] = 0;
							};
						};
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
				if(skipFlag) {
					AnalysisFactory.thirdOrderMatrix[0] = AnalysisFactory.thirdOrderMatrix[0].slice(0, insertAt + 1);
					AnalysisFactory.thirdOrderMatrix[1] = AnalysisFactory.thirdOrderMatrix[1].slice(0, insertAt + 1);
				}
			}

			defferedObj.resolve();

		}

		AnalysisFactory.analyzeText = function(text, order, defferedObj) {
			
			// call computeCorr but skip non-occuring first-/second-/third-order chars
			AnalysisFactory.computeCorr(text, order, defferedObj, true);
			
		};

		AnalysisFactory.getFreqs = function(order) {
			if(order === 1) {
				return AnalysisFactory.firstOrderMatrix[1];
			} else if (order === 2) {
				return AnalysisFactory.secondOrderMatrix[1];
			} else if (order === 3) {
				return AnalysisFactory.thirdOrderMatrix[1];
			}
		}

		AnalysisFactory.getNames = function(order) {
			if(order === 1) {
				return AnalysisFactory.firstOrderMatrix[0];
			} else if (order === 2) {
				return AnalysisFactory.secondOrderMatrix[0];
			} else if (order === 3) {
				return AnalysisFactory.thirdOrderMatrix[0];
			}
		}

		return AnalysisFactory;

	}])


	/* GutenbergText factory
			1. Use this factory to get the URL of the txt file of	a specific book on the Gutenberg Project
			2. Use this factory to get the actual text given an URL to a txt file of a specific book */
	.factory("GutenbergTextFactory", ["$http",function($http) {

		var GutenbergTextFactory = {};
		GutenbergTextFactory.text = "";

		var books = [
			{ title: "A Connecticut Yankee in King Arthur's Court", author: "Mark Twain", file: "a_connecticut_yankee_in_king_arthur_s_court1.txt" },
			{ title: "Adventures of Huckleberry Finn", author: "Mark Twain", file: "adventures_of_huckleberry_finn1.txt" },
			{ title: "Agnes Grey", author: "Anne Bronte", file: "agnes_grey1.txt" },
			{ title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", file: "alices_adventures_in_wonderland.txt" },
			{ title: "A Christmas Carol", author: "Charles Dickens", file: "christmas_carol.txt" },
			{ title: "Memoirs Of Fanny Hill", author: "John Cleland", file: "fanny_hill.txt" },
			{ title: "Jane Eyre", author: "Charlotte Bronte", file: "jane_eyre1.txt" },
			{ title: "Short test text", author: "Test author", file: "test.txt"}
		]

		GutenbergTextFactory.getTxt = function(url) {
			$http.get("res/texts/" + url)
				.success(function(data, status, header, config) {
					GutenbergTextFactory.text = data;
				});
		};

		/* function getTxtURL
				This function retrieves the URL to a txt file of a specific book on the Gutenberg Project.
				It assumes that the parameter *query* contains authors or titles. */
		GutenbergTextFactory.getTxtURL = function(query) {
			
			var result = [];
			var book = {};
			
			for (var i = books.length - 1; i >= 0; i--) {
				book = books[i];
				if (book.title.toLowerCase().indexOf(query.toLowerCase()) != -1 || book.author.toLowerCase().indexOf(query.toLowerCase()) != -1) { // find query in title or author
					result.push(book);
				}
			}

			return result;

		};

		return GutenbergTextFactory;

	}])

	/* myFunctions Factory
			This factory contains custom functions, which 
			can be used in different controllers */
	.factory("myFunctions", ['WordFactory', 'Monkeys', function(WordFactory, Monkeys){

		console.log("myFunctions ready");

		var myFunctions = {};

		var lastMonkey = "";

		var word = "";

		/* checkForWord function
				checks if the new character yielded another word
				and further checks if the word is actually an
				english word
				
				***DON'T USE FOR PARALLEL MONKEYS*** 
			
			*/
		myFunctions.checkForWord = function(character, monkey) {
			
			if(monkey !== lastMonkey) { // reset word with new monkey
				lastMonkey = monkey;
				word = "";
			}

			Monkeys.addCharacter(character, monkey);
			if((character === " ") && word !== ""){ 
				// we finished another word
				var previousChar = word.charAt(-1);
				if(previousChar === "!" || previousChar === "?" || previousChar === "," || previousChar === "." || previousChar === "\"" || previousChar === "\'"){
					// remove punctuation in case there's
					word = word.slice(0,word.length - 1);
				}
				if(WordFactory.words.indexOf(word) !== -1) {
					Monkeys.addActualWord(monkey);
					Monkeys.setMax(word.length, monkey);
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