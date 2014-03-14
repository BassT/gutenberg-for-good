/*
     ===============
     Typing controller
     ===============
     - Controls for the start/stop typing buttons of our lovely monkeys
     - Can we use this for every monkey?	*/
angular.module("gutenberg.controllers")
.controller('TypingCtrl', ['$scope', 'Typing', function($scope, Typing) {

	$scope.typing = "stop";

	$scope.clicked = function(value) {
		console.log("Emitted typingChangedEmit");
		Typing.setStart(value);
		$scope.$emit("typingChangedEmit");  // emit up that someone clicked a typing control button
	};

}]);