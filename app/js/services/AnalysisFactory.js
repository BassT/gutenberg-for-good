/* 
 * AnalysisFactory
 * 
 * This factory contains the text analysis functions for a
 * first-/second- or third-order monkey.
 *  
 */
angular.module('gutenberg.services')
.factory("AnalysisFactory", ["Alphabet", function(Alphabet) {

	var AnalysisFactory = {};

	AnalysisFactory.computeCorr = function(text, order, defferedObj, skipFlag) {

		text = text.slice(0,10000).toLowerCase();

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
							AnalysisFactory.thirdOrderMatrix[0][i*Math.pow(Alphabet.length,2) + j*Alphabet.length + k] = Alphabet[i] + Alphabet[j] + Alphabet[k];
							AnalysisFactory.thirdOrderMatrix[1][i*Math.pow(Alphabet.length,2) + j*Alphabet.length + k] = 0;
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

	};

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
	};

	AnalysisFactory.getNames = function(order) {
		if(order === 1) {
			return AnalysisFactory.firstOrderMatrix[0];
		} else if (order === 2) {
			return AnalysisFactory.secondOrderMatrix[0];
		} else if (order === 3) {
			return AnalysisFactory.thirdOrderMatrix[0];
		}
	};

	return AnalysisFactory;

}]);