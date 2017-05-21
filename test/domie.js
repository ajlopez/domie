
var domie = require('..');

exports['domie as object'] = function (test) {
	test.ok(domie);
	test.equal(typeof domie, 'object');
};