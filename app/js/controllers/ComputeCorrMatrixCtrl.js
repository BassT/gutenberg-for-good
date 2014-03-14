/*
     =====================
     Correlation matrix control
     =====================
     - outputs the correlation matrix
 */
angular.module("gutenberg.controllers")
.controller('CorrMatrixCtrl', ['AnalysisFactory', '$scope', function(AnalysisFactory, $scope){

	$scope.characters = [];

	$scope.q = "";

	$scope.get = function(query) {
		var tempNames = AnalysisFactory.getNames(query.length + 1);
		var tempFreqs = AnalysisFactory.getFreqs(query.length + 1);
		var totalFreq = 0;
		var result = [];
		if(tempFreqs !== undefined && tempNames !== undefined) {
			for (var i = tempFreqs.length - 1; i >= 0; i--) { // sum total frequencies to calculate relative probabilities
				if(tempNames[i].substring(0, query.length) === query) { // filter to characters, which start with query
					totalFreq += tempFreqs[i];
				}
			};
			if(totalFreq === 0) {
				totalFreq = 1; // all of the filtered characters have 0 frequency, so set totalFreq to 1 in order to avoid dividing by 0
			}
			for (var i = 0; i < tempFreqs.length; i++) {
				if(tempNames[i].substring(0, query.length) === query) {
					if(tempFreqs[i]/totalFreq > 0) {
						result.push({ name: tempNames[i], prob: (tempFreqs[i]/totalFreq + 0.0)});
					}
				}
			};
		}

		return result;
		// $scope.characters = result;
	};

}]);