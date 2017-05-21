
function Element(tag) {
	this.nodeType = 1;
	this.childNodes = [];
	this.tagName = tag.toUpperCase();
	
	this.append = function (node) {
		this.childNodes.push(node);
	}
}

function Document() {
	this.nodeType = 9;
	
	this.documentElement = new Element('html');
	this.documentElement.append(new Element('head'));
}

module.exports = {
	document: function () { return new Document(); }
};

