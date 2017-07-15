
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

exports['get inner elements by tag name'] = function (test) {
	var document = domie.document();
	document.getElementsByTagName('body')[0].innerHTML = "<h1>Hello</h1>";
	var elements = document.getElementsByTagName('h1');
	
	test.ok(elements);
	test.equal(elements.length, 1);
	test.equal(elements[0].tagName, 'H1');
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

exports['get element by id'] = function (test) {
	var h1 = document.createElement('h1');
	var id = document.createAttribute('id');
	id.value = 42;
	h1.attributes.setNamedItem(id);
	
	var body = document.getElementsByTagName('body')[0];
	
	body.appendChild(h1);
	
	var result = document.getElementById(42);
	
	test.ok(result);
	test.equal(result.tagName, 'H1');
	test.equal(result.outerHTML, '<h1 id="42" />');
};

exports['get unknown element by id'] = function (test) {	
	var result = document.getElementById('foo');
	
	test.equal(result, null);
};

