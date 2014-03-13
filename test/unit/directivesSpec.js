describe("corr-Matrix-Filter test", function() {

	var element;
	var scope;

	beforeEach(module("gutenberg.directives"));
	beforeEach(inject(function($compile, $rootScope) {
		scope = $rootScope.$new();

		scope.get = function(query) {
			if(query === "a") {
				return [{name: 'ab', prob: 1}];
			} else if (query === "") {
				return [{name: "a", prob: 1}];
			} else {
				return [];
			}
		}

		scope.characters = [];

		element = angular.element("<input type=\"text\" ng-model=\"q\" corr-matrix-filter/>");
		$compile(element)(scope);
	}));

	it("should set characters to [{name: 'a', prob: 1}] after focus", function() {
		element.triggerHandler("focus");
		expect(scope.characters.length).toBe(1);
		expect(scope.characters[0].name).toBe("a");
		expect(scope.characters[0].prob).toBe(1);
	});

	it("should set characters to [] after keydown 'b'", function() {
		element.val("b");
		element.triggerHandler("keydown");
		expect(scope.characters.length).toBe(0);
	})

	it("should set characters to [{name: 'ab', prob: 1}] after keydown 'a'", function() {
		element.val("a");
		element.triggerHandler("keydown");
		expect(scope.characters.length).toBe(1);
		expect(scope.characters[0].name).toBe("ab");
		expect(scope.characters[0].prob).toBe(1);
	})

	it("should be empty for starters", function() {
		expect(element.val()).toBe("");
	});

	it("should have access to scope.characters", function() {
		expect(scope.characters.length).toBe(0);
	});

})