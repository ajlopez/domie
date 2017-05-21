
var domie = require('..');

var document = domie.document();

exports['get elements by tag name'] = function (test) {
	var elements = document.getElementsByTagName('body');
	
	test.ok(elements);
	test.equal(elements.length, 1);
	test.equal(elements[0].tagName, 'BODY');
};

exports['get elements by upper case tag name'] = function (test) {
	var elements = document.getElementsByTagName('BODY');
	
	test.ok(elements);
	test.equal(elements.length, 1);
	test.equal(elements[0].tagName, 'BODY');
};


exports['get elements by mixed case tag name'] = function (test) {
	var elements = document.getElementsByTagName('Body');
	
	test.ok(elements);
	test.equal(elements.length, 1);
	test.equal(elements[0].tagName, 'BODY');
};

exports['get all elements by tag name'] = function (test) {
	var elements = document.getElementsByTagName('*');
	
	test.ok(elements);
	test.equal(elements.length, 3);
	test.equal(elements[0].tagName, 'HTML');
	test.equal(elements[1].tagName, 'HEAD');
	test.equal(elements[2].tagName, 'BODY');
};

