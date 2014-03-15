'use strict';

describe("Controller Tests", function() {

    beforeEach(module("gutenberg.controllers"));

    describe("TextAnalyzerCtrl test", function() {

    	var scope, ctrl;
        var testText = "Some test text";
        var testTextLink = "test.txt";
        var testQuery = "testQuery";
        
        var fakeAnalysisFactory = {
        		analyzeText: function(text, order, defferedObj) {
        			if(order === 1){
        				fakeAnalysisFactory.firstOrderMatrix = new Array(2);
        				fakeAnalysisFactory.firstOrderMatrix[0] = ["a", "b", "c"];
        				fakeAnalysisFactory.firstOrderMatrix[1] = [1,2,3];
        				defferedObj.resolve();
        			} else if (order === 2) {
        				fakeAnalysisFactory.secondOrderMatrix = new Array(2);
        				fakeAnalysisFactory.secondOrderMatrix[0] = ["aa", "ab", "ac"];
        				fakeAnalysisFactory.secondOrderMatrix[1] = [4,5,6];
        				defferedObj.resolve();
        			} else if (order === 3) {
        				fakeAnalysisFactory.thirdOrderMatrix = new Array(2);
        				fakeAnalysisFactory.thirdOrderMatrix[0] = ["aaa", "aab", "aac"];
        				fakeAnalysisFactory.thirdOrderMatrix[1] = [7,8,9];
        				defferedObj.resolve();
        			}
        		},
        		fetchCorrMatrix: function(file, defferedObj, skip) {
        			fakeAnalysisFactory.firstOrderMatrix = new Array(2);
    				fakeAnalysisFactory.firstOrderMatrix[0] = new Array(40);
    				fakeAnalysisFactory.firstOrderMatrix[1] = new Array(40);
    				defferedObj.notify("First-order done");
    				fakeAnalysisFactory.secondOrderMatrix = new Array(2);
    				fakeAnalysisFactory.secondOrderMatrix[0] = new Array(1600);
    				fakeAnalysisFactory.secondOrderMatrix[1] = new Array(1600);
    				defferedObj.notify("Second-order done");
    				fakeAnalysisFactory.thirdOrderMatrix = new Array(2);
    				fakeAnalysisFactory.thirdOrderMatrix[0] = new Array(64000);
    				fakeAnalysisFactory.thirdOrderMatrix[1] = new Array(64000);
    				defferedObj.resolve();
        		}
        };
        
        var fakeGutenbergTextFactory = {
        		getTxt: function(url) {
        			fakeGutenbergTextFactory.text = testText;
        		},
        		getTxtURL: function(query) {
        			if(query === testQuery) {
        				return testTextLink;
        			}
        		}
        };
    	
        beforeEach(module("gutenberg.services"));
        
        beforeEach(inject(function($rootScope, $q, $controller) {
        	scope = $rootScope.$new();
        	ctrl = $controller("TextAnalyzerCtrl", {$scope: scope, 
        		GutenbergTextFactory: fakeGutenbergTextFactory,
        		AnalysisFactory: fakeAnalysisFactory,
        		$q: $q});
        }));
        
        it('should set fakeAnalysisFactory.firstOrderMatrix to [["a", "b", "c"],[1,2,3]] when analyzeText(1) is called', function() {
        	scope.analyzeText(1).then(function() {
        		expect(fakeAnalysisFactory.firstOrderMatrix).toBe([["a","b","c"],[1,2,3]]);
        	});
        });
        
        it('should set fakeAnalysisFactory.secondOrderMatrix to [["aa", "ab", "ac"],[4,5,6]] when analyzeText(2) is called', function() {
        	scope.analyzeText(2).then(function() {
        		expect(fakeAnalysisFactory.secondOrderMatrix).toBe([["aa", "ab", "ac"],[4,5,6]]);
        	});
        });
        
        it('should set fakeAnalysisFactory.thirdOrderMatrix to [["aaa", "aab", "aac"],[7,8,9]] when analyzeText(3) is called', function() {
        	scope.analyzeText(3).then(function() {
        		expect(fakeAnalysisFactory.thirdOrderMatrix).toBe([["aaa", "aab", "aac"],[7,8,9]]);
        	});
        });
        
        it('should set scope.selectedBook to { file: "test.txt" } and fakeGutenbergTextFactory.text to "Some test text" when scope.loadText("test.txt") is called', function() {
        	scope.loadText(testTextLink);
        	expect(scope.selectedBook.file).toBe(testTextLink);
        	expect(fakeGutenbergTextFactory.text).toBe(testText);
        });
        
        it('should return "test.txt" when requestTexts("testQuery") is called', function() {
			expect(scope.requestTexts(testQuery)).toBe(testTextLink);
		});
        
        it('should set firstOrderMatrix.length = 40, secondOrderMatrix.length = 1600, thirdOrderMatrix.length = 64000 after computeCorr was resolved', function() {
        	scope.computeCorr().then(function() {
        		expect(fakeAnalysisFactory.firstOrderMatrix.length).toBe(40);
        		expect(fakeAnalysisFactory.secondOrderMatrix.length).toBe(1600);
        		expect(fakeAnalysisFactory.thirdOrderMatrix.length).toBe(64000);
        	});
        });

    });
});

