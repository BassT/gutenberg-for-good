/*
     =====================
     Text analyzer control
     =====================
     - triggers the text analysis of some factory for monkeys
     - triggers computation of corr. matrices
 */
angular.module("gutenberg.controllers")
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
		$scope.selectedBook = { file: url };
	};

	$scope.requestTexts = function(query) {
		return GutenbergTextFactory.getTxtURL(query);
	};

	$scope.computeCorr = function() {

		var defferedObj = $q.defer();
		
		AnalysisFactory.fetchCorrMatrix($scope.selectedBook.file, defferedObj, false);
		
		return defferedObj.promise;

	};

}]);