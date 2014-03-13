'use strict';

/* jasmine specs for services go here */

describe("AnalysisFactory", function() {
	beforeEach(function() {
		module("gutenberg.services");
		inject(function($q) {
			defferedObj = $q.defer();	
		});
		inject(function(AnalysisFactory) {
			factory = AnalysisFactory;
		});
	});

	var text = "Some test text";

	var shortText = "some";

	var defferedObj;

	var factory;

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