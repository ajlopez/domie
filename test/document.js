
var domie = require('..');

exports['create document object'] = function (test) {
	var document = domie.document();
	
	test.ok(document);
	test.equal(typeof document, 'object');
}

