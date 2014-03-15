'use strict';

/* jasmine specs for services go here */

describe("AnalysisFactory", function() {
	beforeEach(function() {
		module("gutenberg");
		module("gutenberg.services");
		inject(function($q) {
			defferedObj = $q.defer();	
		});
		inject(function(AnalysisFactory) {
			factory = AnalysisFactory;
		});
		inject(function($injector) {
			$httpBackend = $injector.get("$httpBackend");
			
			$httpBackend.when("GET", testQuery).respond({ 
				characters: ["abc", "abd"], 
				frequencies: [2, 1]
			});
			
			$httpBackend.when("GET", testQuery2).respond({ 
				characters: ["a", "b"], 
				frequencies: [4, 3]
			});
		});
	});
	
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
	
	var $httpBackend;
	var text = "Some test text";
	var shortText = "some";
	var defferedObj;
	var factory;
	
	var fileURL = "legend_of_sleepy_hollow.txt";
	var baseURI = "http://localhost:8080";
	var skip = "False";
	var fileBaseURI = "https://wiki.eecs.yorku.ca/course_archive/2013-14/W/6339/_media/assignments:";
	var testQuery = baseURI + "/to?callback=corrMatrix&" +
			"txt=" + fileBaseURI + fileURL + "?skip=" + skip;
	var testQuery2 = baseURI + "/fo?callback=corrMatrix&" +
			"txt=" + fileBaseURI + fileURL + "?skip=True";
	

	it("should return an array of length 2 without undefined values if skipFlag is false and order 3", function() {
		factory.fetchCorrMatrix(fileURL, 3, defferedObj, false);
		$httpBackend.expectGET(testQuery);
		$httpBackend.flush();
		expect(factory.thirdOrderMatrix.length).toBe(2);
		expect(factory.thirdOrderMatrix[0].length).toBe(2);
		expect(factory.thirdOrderMatrix[1].length).toBe(2);
		expect(factory.thirdOrderMatrix[0][0]).toBe("abc");
		expect(factory.thirdOrderMatrix[0][1]).toBe("abd");
		expect(factory.thirdOrderMatrix[1][0]).toBe(2);
		expect(factory.thirdOrderMatrix[1][1]).toBe(1);
	});
	
	it("should return an array of length 2 without undefined values if skipFlag is true and order 1", function() {
		factory.fetchCorrMatrix(fileURL, 1, defferedObj, true);
		$httpBackend.expectGET(testQuery2);
		$httpBackend.flush();
		expect(factory.firstOrderMatrix.length).toBe(2);
		expect(factory.firstOrderMatrix[0].length).toBe(2);
		expect(factory.firstOrderMatrix[1].length).toBe(2);
		expect(factory.firstOrderMatrix[0][0]).toBe("a");
		expect(factory.firstOrderMatrix[0][1]).toBe("b");
		expect(factory.firstOrderMatrix[1][0]).toBe(4);
		expect(factory.firstOrderMatrix[1][1]).toBe(3);			
	});
	
	it("should return an array of length 6 after analyzeText with 'Some test text' and first-order is executed", function() {
		factory.analyzeText(text, 1, defferedObj);
		expect(factory.firstOrderMatrix.length).toBe(2);
		expect(factory.firstOrderMatrix[0].length).toBe(7);
		expect(factory.firstOrderMatrix[1].length).toBe(7);
	});

	it("should return an array of length 3 after analyzeText with 'some' and second-order is executed", function() {
		factory.analyzeText(shortText, 2, defferedObj);
		expect(factory.firstOrderMatrix).toBe(undefined);
		expect(factory.thirdOrderMatrix).toBe(undefined);
		expect(factory.secondOrderMatrix.length).toBe(2);
		expect(factory.secondOrderMatrix[0].length).toBe(3);
		expect(factory.secondOrderMatrix[1].length).toBe(3);
	});

	it("should return an array of length 2 after analyzeText with 'some' and third-order is executed", function() {
		factory.analyzeText(shortText, 3, defferedObj);
		expect(factory.firstOrderMatrix).toBe(undefined);
		expect(factory.secondOrderMatrix).toBe(undefined);
		expect(factory.thirdOrderMatrix.length).toBe(2);
		expect(factory.thirdOrderMatrix[0].length).toBe(2);
		expect(factory.thirdOrderMatrix[1].length).toBe(2);
	});

	it("computeCorr should return an array of length 40 if skipFlag is false and order 1", function() {
		factory.computeCorr(text, 1, defferedObj, false);
		expect(factory.firstOrderMatrix.length).toBe(2);
		expect(factory.firstOrderMatrix[0].length).toBe(40);
		expect(factory.firstOrderMatrix[1].length).toBe(40);
	});

	it("computeCorr should return an array of length 64000 with no undefined values if skipFlag is false and order 3", function() {
		factory.computeCorr(text, 3, defferedObj, false);
		expect(factory.thirdOrderMatrix.length).toBe(2);
		expect(factory.thirdOrderMatrix[0].length).toBe(64000);
		expect(factory.thirdOrderMatrix[1].length).toBe(64000);
		for (var i = factory.thirdOrderMatrix[0].length - 1; i >= 0; i--) {
			expect(factory.thirdOrderMatrix[0][i]).toBeDefined();
			expect(factory.thirdOrderMatrix[1][i]).toBeDefined();
		};
	});

	it("should return an array of length 1600 after computeCorr with skipFlag false and order 2 secondOrderMatrix", function() {
		factory.computeCorr(text, 2, defferedObj, false);
		expect(factory.secondOrderMatrix.length).toBe(2);
		expect(factory.secondOrderMatrix[0].length).toBe(1600);
		expect(factory.secondOrderMatrix[1].length).toBe(1600);
	});


});