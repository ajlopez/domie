
var domie = require('..');

exports['create document object'] = function (test) {
	var document = domie.document();
	
	test.ok(document);
	test.equal(typeof document, 'object');
}

exports['document node type'] = function (test) {
	var document = domie.document();
	
	test.equal(document.nodeType, 9);
}

exports['initial document element'] = function (test) {
	var document = domie.document();
	
	test.ok(document.documentElement);
	test.equal(document.documentElement.tagName, "HTML");
	test.equal(document.documentElement.nodeType, 1);
}
