angular.module('gutenberg.directives', []).directive("gutenbergSearch",
		function() {
			return {
				link : function(scope, element, attr) {
					element.bind("keydown", function(evt) {
						scope.requestTexts(element.val());
						scope.textLoadTextButton = "Loaded " + element.val();
					});
				}
			};
		})

/*
 * ================ PERSONAL NOTE ================ Spent an hour figuring out
 * why this directive wasn't working. Turns out snack-case (analyze-on-click)
 * doesn't work, but camelCase does (analyzeOnClick). It's said in the
 * documentation, but: COME ON, GOOGLE!
 */

.directive("analyzeOnClick", [ "$timeout", function($timeout) {
	return {
		link : function(scope, element, attr) {
			element.bind("click", function(evt) {
				scope.$apply(function() {
					element.text("Analyzing...");
				});
				console.log("Analyzing...");
				$timeout(function() {
					scope.analyzeText(attr.order).then(function() {
						element.text("Done - Analyze again");
						console.log("Done");
					});
				}, 500);
			});
		}
	};
} ])

.directive("computeCorrOnClick", [ "$timeout", function($timeout) {
	return {
		link : function(scope, element, attr) {
			element.bind("click", function(evt) {
				scope.$apply(function() {
					element.text("Backend is computing correlation matrices...");
				});
				console.log("Computing corr. matrix...");
				$timeout(function() {
					scope.computeCorr().then(function() {
						scope.textComputeButton = "Done - compute again";
						element.text(scope.textComputeButton);
						console.log("Done");
					}, function() {
						// reject function
					}, function(notification) {
						scope.textComputeButton = "Backend computed " + notification + " correlation matrix, ...";
						element.text(scope.textComputeButton);
					});
				}, 500);
			});
		}
	};
} ])

.directive(
		"corrMatrixFilter",
		[ function() {
			return {
				link : function(scope, element, attr) {
					element.bind("keydown keyup", function(evt) {
						scope.$apply(scope.characters = scope.get(element.val()
								.toLowerCase()));
					});
					element.bind("focus", function(evt) {
						scope.$apply(scope.characters = scope.get(element.val()
								.toLowerCase()));
					});
				}
			};
		} ]);
