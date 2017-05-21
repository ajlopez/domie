
function Element(tag) {
	this.nodeType = 1;
	this.childNodes = [];
	
	Object.defineProperty(this, 'tagName', {
		get: function () { return tag.toUpperCase(); }
	});
	
	Object.defineProperty(this, 'nodeType', {
		get: function () { return 1; }
	});

	this.append = function (node) {
		this.childNodes.push(node);
	}
}

function Document() {
	this.nodeType = 9;
	
	this.documentElement = new Element('html');
	this.documentElement.append(new Element('head'));
	this.documentElement.append(new Element('body'));
	
	this.createElement = function (tag) { return new Element(tag); };
}

module.exports = {
	document: function () { return new Document(); }
};

