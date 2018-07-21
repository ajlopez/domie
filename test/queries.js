
var domie = require('..');

var document = domie.document();

exports['querySelector in document using tag name'] = function (test) {
	var element = document.querySelector('body');
	
	test.equal(element.tagName, 'BODY');
};

exports['querySelector in document using upper case tag name'] = function (test) {
	var element = document.querySelector('body');
	
	test.equal(element.tagName, 'BODY');
};

exports['querySelector in document returns null'] = function (test) {
	var element = document.querySelector('foo');
	
	test.equal(element, null);
};

