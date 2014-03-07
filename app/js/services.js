'use strict';

/* Services */
angular.module('gutenberg.services', [])
	
	.value("Alphabet", ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',"'",' ',',','.',';',':','?','!','(',')','-',"@",'"','#'])
	

	.factory("Typing", function() { 
		
		var Typing = {};

		Typing.start = false;
		Typing.speed = 50;

		Typing.setStart = function(value) {
			this.start = value;
		};

		Typing.setSpeed = function(value) {
			this.speed = value;
		};

		return Typing;

	});