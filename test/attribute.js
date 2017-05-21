
var domie = require('..');

exports['create attribute'] = function (test) {
	var attr = domie.document().createAttribute('class');
	
	test.ok(attr);
	test.equal(typeof attr, 'object');
};

exports['attribute name'] = function (test) {
	var attr = domie.document().createAttribute('class');
	
	test.equal(attr.name, 'class');
	
	attr.name = 'foo';
	
	test.equal(attr.name, 'class');
};

exports['attribute value'] = function (test) {
	var attr = domie.document().createAttribute('id');
	
	test.strictEqual(attr.value, '');
	
	attr.value = 42;
	
	test.strictEqual(attr.value, '42');
};



