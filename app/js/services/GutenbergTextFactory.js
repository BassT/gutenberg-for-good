/* 
 * GutenbergText factory
 * 
 * 1. Use this factory to get the URL of the txt file of	a specific book on the Gutenberg Project
 * 2. Use this factory to get the actual text given an URL to a txt file of a specific book 
 */
angular.module('gutenberg.services')
.factory("GutenbergTextFactory", ["$http",function($http) {

	var GutenbergTextFactory = {};
	GutenbergTextFactory.text = "";

	var books = [
	             { title: "A Connecticut Yankee in King Arthur's Court", author: "Mark Twain", file: "a_connecticut_yankee_in_king_arthur_s_court1.txt" },
	             { title: "Adventures of Huckleberry Finn", author: "Mark Twain", file: "adventures_of_huckleberry_finn1.txt" },
	             { title: "Agnes Grey", author: "Anne Bronte", file: "agnes_grey1.txt" },
	             { title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", file: "alices_adventures_in_wonderland.txt" },
	             { title: "A Christmas Carol", author: "Charles Dickens", file: "christmas_carol.txt" },
	             { title: "Memoirs Of Fanny Hill", author: "John Cleland", file: "fanny_hill.txt" },
	             { title: "Jane Eyre", author: "Charlotte Bronte", file: "jane_eyre1.txt" },
	             { title: "Short test text", author: "Test author", file: "test.txt"}
	             ];

	GutenbergTextFactory.getTxt = function(url) {
		$http.get("res/texts/" + url)
		.success(function(data, status, header, config) {
			GutenbergTextFactory.text = data;
		});
	};

	/* function getTxtURL
				This function retrieves the URL to a txt file of a specific book on the Gutenberg Project.
				It assumes that the parameter *query* contains authors or titles. */
	GutenbergTextFactory.getTxtURL = function(query) {

		var result = [];
		var book = {};

		for (var i = books.length - 1; i >= 0; i--) {
			book = books[i];
			if (book.title.toLowerCase().indexOf(query.toLowerCase()) != -1 || book.author.toLowerCase().indexOf(query.toLowerCase()) != -1) { // find query in title or author
				result.push(book);
			}
		}

		return result;

	};

	return GutenbergTextFactory;

}]);