angular.module('gutenberg.directives', [])
	.directive("gutenbergSearch", function() {
		return {
			link: function(scope, element, attr) {
				element.bind("keydown", function(evt) {
					scope.requestTexts(element.val());
				});
			}
		};
	})

	/* ================
		PERSONAL NOTE
	   ================
		Spent an hour figuring out why this directive wasn't working.
		Turns out snack-case (analyze-on-click) doesn't work, but
		camelCase does (analyzeOnClick). It's said in the documentation,
		but: COME ON, GOOGLE! 
	*/

	.directive("analyzeOnClick", ["$timeout", function($timeout) {
		return {
			link: function(scope, element, attr) {
				element.bind("click", function(evt) {
					scope.$apply(function() {
						element.text("Analyzing...");
					});
					console.log("Analyzing...");
					$timeout( function() {
						scope.analyzeText(attr.order).then(function() {
							element.text("Done - Analyze again");
							console.log("Done");
						});
					}, 500);
				});
			}
		};
	}]);
