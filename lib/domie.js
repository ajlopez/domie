	
function Attribute(name) {
}

function Element(tag) {
	this.nodeType = 1;
	this.childNodes = [];
	
	Object.defineProperty(this, 'tag', {
		get: function () { return tag; }
	});
}

Object.defineProperty(Element.prototype, 'nodeType', {
	get: function () { return 1; }
});

Object.defineProperty(Element.prototype, 'tagName', {
	get: function () { return this.tag.toUpperCase(); }
});

Object.defineProperty(Element.prototype, 'outerHTML', {
	get: function () { return '<' + this.tag + '>' + this.innerHTML + '</' + this.tag + '>'; }
});

Element.prototype.append = function (node) {
	this.childNodes.push(node);
};

Object.defineProperty(Element.prototype, 'innerHTML', {
	get: function () { 
		var result = '';
		
		for (var n in this.childNodes)
			result += this.childNodes[n].outerHTML;

		return result;
	}
});

function Document() {
	this.nodeType = 9;
	
	this.documentElement = new Element('html');
	this.documentElement.append(new Element('head'));
	this.documentElement.append(new Element('body'));
	
	this.createElement = function (tag) { return new Element(tag); };
	this.createAttribute = function (name) { return new Attribute(name); };
}

Object.defineProperty(Document.prototype, 'nodeType', {
	get: function () { return 9; }
});

module.exports = {
	document: function () { return new Document(); }
};

