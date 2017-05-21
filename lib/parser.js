
function parse(text, document) {
	if (text == null || text.length === 0)
		return [];
		
	return [ document.createTextNode(text) ];
}

module.exports = {
	parse: parse
}