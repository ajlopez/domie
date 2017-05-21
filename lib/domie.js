
function Element(tag) {
	this.nodeType = 1;
	this.childNodes = [];
	
	Object.defineProperty(this, 'tag', {
		get: function () { return tag; }
	});

	this.append = function (node) {
		this.childNodes.push(node);
	}

	Object.defineProperty(this, 'outerHTML', {
		get: function () { return '<' + tag + '>' + this.innerHTML + '</' + tag + '>'; }
	});

}

Object.defineProperty(Element.prototype, 'nodeType', {
	get: function () { return 1; }
});

Object.defineProperty(Element.prototype, 'tagName', {
	get: function () { return this.tag.toUpperCase(); }
});

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
}

Object.defineProperty(Document.prototype, 'nodeType', {
	get: function () { return 9; }
});

module.exports = {
	document: function () { return new Document(); }
};

