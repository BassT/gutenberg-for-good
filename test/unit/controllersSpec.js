'use strict';

describe("corrMatrixCtrl test", function() {

	var fakeFactory = {
		getNames: function(order) {
			if(order === 1) {
				return ["a","b","c"];
			} else if (order === 2) {
				return ["aa", "ab", "ac", "bc"];
			} else if (order === 3) {
				return ["abc", "bac"];
			}
		},
		getFreqs: function(order) {
			if(order === 1) {
				return [1,2,3];
			} else if (order === 2) {
				return [1,2,3,4];
			} else if (order === 3) {
				return [1,2];
			}	
		}
	};

	beforeEach(function() {
        module('gutenberg.controllers');
    });

	it("should have a get method", inject(function($controller, $rootScope) {

        var scope = $rootScope.$new();
		var ctrl = $controller("CorrMatrixCtrl", {AnalysisFactory: fakeFactory, $scope: scope});

		expect(angular.isFunction(scope.get)).toBe(true);
        
	}));

});