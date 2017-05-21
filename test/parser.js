
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
