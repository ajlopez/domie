
var domie = require('..');

var document = domie.document();

exports['create text node'] = function (test) {
	var node = document.createTextNode('hello world');
	
	test.ok(node);
	test.equal(node.nodeType, 3);
	test.equal(node.nodeValue, 'hello world');
};

exports['change text node value'] = function (test) {
	var node = document.createTextNode('hello world');
	
	test.ok(node);
	test.equal(node.nodeType, 3);
	
	node.nodeValue = 'hola mundo';
	
	test.equal(node.nodeValue, 'hola mundo');
};

exports['innerHTML and outerHTML with text node'] = function (test) {
	var element = document.createElement('h1');
	var node = document.createTextNode('hello world');
	element.appendChild(node);
	
	test.equal(element.innerHTML, 'hello world');
	test.equal(element.outerHTML, '<h1>hello world</h1>');
};

