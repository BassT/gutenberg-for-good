/*
     ===============
     View controller
     ===============
     - Controller for the whole ngView in index.html
     - Parent scope for others */
angular.module("gutenberg.controllers")
.controller('ViewCtrl', ['$scope', function($scope) {

	$scope.$on("typingChangedEmit", function() {
		console.log("Received typingChangedEmit and broadcasted typingChangedBroadcast");
		$scope.$broadcast("typingChangedBroadcast"); // broadcast down that someone clicked a typing control button
	});

	$scope.$on("TypedCharacterEmit", function() {
		console.log("Received TypedCharacterEmit and broadcasted TypedCharacterBroadcast");
		$scope.$broadcast("TypedCharacterBroadcast");
	});

}]);
