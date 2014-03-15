'use strict';

describe("Controller Tests", function() {

    beforeEach(module("gutenberg.controllers"));

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
                    return [1,0];
                }
            }
        };

        var scope;
        var ctrl;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller("CorrMatrixCtrl", {AnalysisFactory: fakeFactory, $scope: scope});
        }));

        it('should return [{name: abc, prob: 1}] when get("abc") is called', function() {
            var characters = scope.get("abc");
            expect(characters.length).toBe(1);
            expect(characters[0].name).toBe("abc");
            expect(characters[0].prob).toBe(1);
        })

        it('should return [{name: abc, prob: 1}] when get("ab") is called', function() {
            var characters = scope.get("ab");
            expect(characters.length).toBe(1);
            expect(characters[0].name).toBe("abc");
            expect(characters[0].prob).toBe(1);
        })

        it('should have prob 0 if get("ba") is called', function() {
            var characters = scope.get("ba");
            expect(characters.length).toBe(0);
        })

        it("should have a get method", inject(function($controller, $rootScope) {

            expect(angular.isFunction(scope.get)).toBe(true);

        }));

        it("should return a,b,c when get('') is called", function() {
            expect(scope.get('')[0].name).toBe("a");
            expect(scope.get('')[1].name).toBe("b");
            expect(scope.get('')[2].name).toBe("c");
        });

        it("should return probabilities [1/6, 2/6, 3/6] when get('') is called", function() {
            expect(scope.get('')[0].prob).toBe(1/6);
            expect(scope.get('')[1].prob).toBe(2/6);
            expect(scope.get('')[2].prob).toBe(3/6);
        });

        it('should return ["aa", "ab", "ac", "bc"] (length 4) when get("a") is called', function() {
            var characters = scope.get("a");
            expect(characters[0].name).toBe("aa");
            expect(characters[1].name).toBe("ab");
            expect(characters[2].name).toBe("ac");
        });

        it('should have probabilities [1/6, 2/6, 3/6] when get("a") is called', function() {
            var characters = scope.get("a");
            expect(characters[0].prob).toBe(1/6);
            expect(characters[1].prob).toBe(2/6);
            expect(characters[2].prob).toBe(3/6);
        });

        it('should have prob 1 when get("b") is called', function() {
            var characters = scope.get("b");
            expect(characters.length).toBe(1);
            expect(characters[0].prob).toBe(1);
        })

        it('should return [] when get("abcads") is called', function() {
            var characters = scope.get("abcads");
            expect(characters.length).toBe(0);
        });

    });
})

