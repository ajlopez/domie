
var parser = require('../lib/parser');
var document = require('..').document();

exports['parse text'] = function (test) {
	var result = parser.parse('hello world', document);
	
	test.ok(result);
	test.equal(result.length, 1);
	test.equal(result[0].nodeType, 3);
	test.equal(result[0].nodeValue, 'hello world');
}

exports['parse blank text'] = function (test) {
	var result = parser.parse('   ', document);
	
	test.ok(result);
	test.equal(result.length, 1);
	test.equal(result[0].nodeType, 3);
	test.equal(result[0].nodeValue, '   ');
}

exports['parse empty text'] = function (test) {
	var result = parser.parse('', document);
	
	test.ok(result);
	test.equal(result.length, 0);
}

exports['parse null text'] = function (test) {
	var result = parser.parse(null, document);
	
	test.ok(result);
	test.equal(result.length, 0);
}

exports['parse simple element'] = function (test) {
	var result = parser.parse('<h1></h1>', document);
	
	test.ok(result);
	test.equal(result.length, 1);
	test.equal(result[0].nodeType, 1);
	test.equal(result[0].tagName, 'H1');
	test.equal(result[0].outerHTML, '<h1></h1>');
}

exports['parse two elements'] = function (test) {
	var result = parser.parse('<h1></h1><h2></h2>', document);
	
	test.ok(result);
	test.equal(result.length, 2);

	test.equal(result[0].nodeType, 1);
	test.equal(result[0].tagName, 'H1');
	test.equal(result[0].outerHTML, '<h1></h1>');

	test.equal(result[1].nodeType, 1);
	test.equal(result[1].tagName, 'H2');
	test.equal(result[1].outerHTML, '<h2></h2>');
}
