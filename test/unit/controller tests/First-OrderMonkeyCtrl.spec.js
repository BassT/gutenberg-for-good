'use strict';

describe("controller Tests", function() {

	var scope, ctrl, root, timeout;
	var testMatrix = [["a","b"],[1,0]];
	var fakeAnalysisFactory = {
			firstOrderMatrix: testMatrix
	};
	
    beforeEach(module("gutenberg.controllers"));
    beforeEach(module("gutenberg.services"));
    beforeEach(inject(function($controller, $timeout, $rootScope, $interval, Typing, myFunctions, Alphabet, Monkeys) {
		scope = $rootScope.$new();
		root = $rootScope;
		timeout = $timeout;
		ctrl = $controller("First-orderMonkey", {
			$scope: scope, 
			Typing: Typing, 
			$interval: $interval,
			myFunctions: myFunctions,
			Alphabet: Alphabet,
			Monkeys: Monkeys,
			AnalysisFactory: fakeAnalysisFactory});
	}));

    describe("First-orderMonkey test", function() {

        describe("Initialization", function() {
			
        	it("should have an empty timer, character and matrix = [['a','b'],[1,0]]", function() {
				expect(ctrl.timer).toBeUndefined();
				expect(ctrl.character).toBe("");
				expect(ctrl.matrix).toBe(testMatrix);
				expect(scope.text).toBe("");
			});
        	
		});
        
        describe("Ongoing typing", function() {
        	
        	it("should start typing on typingChangedBroadcast", function() {
        		expect(scope.text).toBe("");
        		root.$broadcast("typingChangedBroadcast");
        		timeout(function() {
        			console.log("Typed text: " + scope.text);
        		}, 500)
        		.then(function(success) {
        			expect(scope.text.indexOf("a")).toBe(0);
        			expect(scope.text.indexOf("b")).toBe(-1);
    			})
    			.then(function(notification) {
    				console.log(notification);
    			})
    			.then(function(reject) {
    				console.log(reject);
    			});
        		timeout.flush();
			});
        	
        });

    });
});

