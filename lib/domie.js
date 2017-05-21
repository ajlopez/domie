
function Element(tag) {
	this.nodeType = 1;
	this.tagName = tag.toUpperCase();
}

function Document() {
	this.nodeType = 9;
	
	this.documentElement = new Element('html');
}

module.exports = {
	document: function () { return new Document(); }
};

