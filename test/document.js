
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

exports['html has head'] = function (test) {
	var document = domie.document();
	
	var html = document.documentElement;
	
	test.ok(html.childNodes);
	test.ok(html.childNodes.length);
	
	var head = html.childNodes[0];
	
	test.ok(head);
	test.equal(head.tagName, "HEAD");
	test.equal(head.nodeType, 1);
}
