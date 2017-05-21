
var domie = require('..');

exports['outer HTML'] = function (test) {
	var element = domie.document().createElement('h1');
	
	test.ok(element);
	test.equal(element.outerHTML, '<h1></h1>');
};

exports['inner HTML'] = function (test) {
	var element = domie.document().createElement('h1');
	
	test.ok(element);
	test.equal(element.innerHTML, '');
};

exports['document outer HTML'] = function (test) {
	var element = domie.document().documentElement;
	
	test.equal(element.outerHTML, '<html><head></head><body></body></html>');
};

exports['document inner HTML'] = function (test) {
	var element = domie.document().documentElement;
	
	test.equal(element.innerHTML, '<head></head><body></body>');
};

exports['no attributes'] = function (test) {
	var element = domie.document().createElement('h1');
	
	test.ok(element.attributes);
	test.equal(element.attributes.length, 0);
};

exports['get named attribute as null'] = function (test) {
	var element = domie.document().createElement('h1');
	
	test.equal(element.attributes.getNamedItem('foo'), null);
};

exports['set and get named attribute'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var attr = document.createAttribute('id');
	attr.value = 42;
	element.attributes.setNamedItem(attr);
	
	var result = element.attributes.getNamedItem('id');
	
	test.ok(result);
	test.equal(result.name, 'id');
	test.equal(result.value, '42');
};

exports['set, get and remove named attribute'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var attr = document.createAttribute('id');
	attr.value = 42;
	element.attributes.setNamedItem(attr);
	element.attributes.removeNamedItem('id');
	
	var result = element.attributes.getNamedItem('id');
	
	test.equal(result, null);
	test.equal(element.attributes.length, 0);
};
