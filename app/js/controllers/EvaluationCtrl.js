/*
     ===============
     Evaluation controller
     ===============
     - controls the evaluation panel of the monkey problems */
angular.module("gutenberg.controllers")
.controller("EvaluationCtrl", ["$scope", "Monkeys", function($scope, Monkeys) {

	$scope.monkeys = Monkeys.monkeys;

	/* =============
         Personal note: This actually works! I didn't expect that.
         Apparently $scope.$watch acts like an observer: Once it is
         "attached" to some varible it will be triggered whenever the
         expression is met. Cool stuff.
         ============= */

	for (var i = Monkeys.monkeys.length - 1; i >= 0; i--) {
		$scope.$watch("Monkeys.monkeys[" + i + "].fakeWords", function(newVal, oldVal, scope) {
			if(newVal !== undefined) {
				$scope.monkeys[i].fakeWords = newVal;
			}
		});
		$scope.$watch("Monkeys.monkeys[" + i + "].actualWords", function(newVal, oldVal, scope) {
			if(newVal !== undefined) {
				$scope.monkeys[i].actualWords = newVal;
			}
		});
	};

}]);