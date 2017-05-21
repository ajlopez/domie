
function Element(tag) {
	this.nodeType = 1;
	this.childNodes = [];
	
	Object.defineProperty(this, 'tagName', {
		get: function () { return tag.toUpperCase(); }
	});

	this.append = function (node) {
		this.childNodes.push(node);
	}
}

Object.defineProperty(Element.prototype, 'nodeType', {
	get: function () { return 1; }
});

function Document() {
	this.nodeType = 9;
	
	this.documentElement = new Element('html');
	this.documentElement.append(new Element('head'));
	this.documentElement.append(new Element('body'));
	
	this.createElement = function (tag) { return new Element(tag); };
}

Object.defineProperty(Document.prototype, 'nodeType', {
	get: function () { return 9; }
});

module.exports = {
	document: function () { return new Document(); }
};

