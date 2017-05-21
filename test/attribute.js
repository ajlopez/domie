
var domie = require('..');

exports['create attribute'] = function (test) {
	var attr = domie.document().createAttribute('class');
	
	test.ok(attr);
	test.equal(typeof attr, 'object');
};