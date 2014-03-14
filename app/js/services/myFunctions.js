/* myFunctions Factory
			This factory contains custom functions, which 
			can be used in different controllers */
angular.module('gutenberg.services')
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