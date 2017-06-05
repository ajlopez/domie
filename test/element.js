
var domie = require('..');

exports['outer HTML'] = function (test) {
	var document = domie.document();
	
	var element = document.createElement('h1');
	
	test.ok(element.ownerDocument);
	test.strictEqual(element.ownerDocument, document);
};

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

exports['set inner HTML to text'] = function (test) {
	var element = domie.document().createElement('h1');
	
	test.ok(element);
	test.equal(element.innerHTML, '');
	
	element.innerHTML = "hello world";
	test.equal(element.innerHTML, 'hello world');
};

exports['set inner HTML to elements'] = function (test) {
	var element = domie.document().createElement('div');
	
	test.ok(element);
	test.equal(element.innerHTML, '');
	
	element.innerHTML = "<h1>hello</h1><h2>world</h2>";
	test.equal(element.innerHTML, '<h1>hello</h1><h2>world</h2>');
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
	
	test.equal(element.attributes.length, 1);
};

exports['set and get named attributes'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');

	var attr1 = document.createAttribute('id');
	attr1.value = 42;
	element.attributes.setNamedItem(attr1);
	
	var attr2 = document.createAttribute('name');
	attr2.value = 'foo';
	element.attributes.setNamedItem(attr2);

	var result = element.attributes.getNamedItem('id');
	
	test.ok(result);
	test.equal(result.name, 'id');
	test.equal(result.value, '42');

	var result = element.attributes.getNamedItem('name');
	
	test.ok(result);
	test.equal(result.name, 'name');
	test.equal(result.value, 'foo');
	
	test.equal(element.attributes.length, 2);

	var result = element.attributes[0];
	
	test.ok(result);
	test.equal(result.name, 'id');
	test.equal(result.value, '42');

	var result = element.attributes[1];
	
	test.ok(result);
	test.equal(result.name, 'name');
	test.equal(result.value, 'foo');
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

exports['outer HTML with attribute'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var attr = document.createAttribute('id');
	attr.value = 42;
	element.attributes.setNamedItem(attr);
	
	test.equal(element.outerHTML, '<h1 id="42"></h1>');
};

exports['get attribute'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var attr = document.createAttribute('id');
	attr.value = 42;
	element.attributes.setNamedItem(attr);
	
	test.strictEqual(element.getAttribute('id'), '42');
};

exports['get unknown attribute'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	
	test.equal(element.getAttribute('id'), null);
};

exports['get attribute node'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var attr = document.createAttribute('id');
	attr.value = 42;
	element.attributes.setNamedItem(attr);
	
	var result = element.getAttributeNode('id');
	
	test.ok(result);
	test.equal(result.name, 'id');
	test.strictEqual(result.value, '42');
};

exports['get unknown attribute node'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	
	test.equal(element.getAttributeNode('id'), null);
};

exports['append child'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var text = document.createTextNode('hello world');
	
	element.appendChild(text);
	
	test.equal(element.childNodes.length, 1);
	test.equal(element.outerHTML, '<h1>hello world</h1>');
};

exports['append child'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var text = document.createTextNode('hello world');
	
	element.appendChild(text);
	
	test.equal(element.childNodes.length, 1);
	test.equal(element.outerHTML, '<h1>hello world</h1>');
};

exports['remove child'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var text1 = document.createTextNode('hello ');
	var text2 = document.createTextNode('world');
	
	element.appendChild(text1);
	element.appendChild(text2);
	
	test.equal(element.childNodes.length, 2);
	test.equal(element.outerHTML, '<h1>hello world</h1>');
	
	element.removeChild(text1);
	
	test.equal(element.childNodes.length, 1);
	test.equal(element.outerHTML, '<h1>world</h1>');
};

exports['insert before'] = function (test) {
	var document = domie.document();
	var element = document.createElement('h1');
	var text1 = document.createTextNode('hello ');
	var text2 = document.createTextNode('world');
	
	element.appendChild(text2);
	element.insertBefore(text1, text2);
	
	test.equal(element.childNodes.length, 2);
	test.equal(element.outerHTML, '<h1>hello world</h1>');
};


