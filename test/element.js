
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
