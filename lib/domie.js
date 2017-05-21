
function Attributes() {
	var attrs = {};
	
	Object.defineProperty(this, 'length', {
		get: function () { return Object.keys(attrs).length; }
	});
	
	this.setNamedItem = function (item) {
		attrs[item.name] = item;
	};

	this.getNamedItem = function (name) {
		return attrs[name];
	};

	this.removeNamedItem = function (name) {
		delete attrs[name];
	};
}

function Attribute(name) {
	var value = '';
	
	Object.defineProperty(this, 'name', {
		get: function () { return name; }
	});
	
	Object.defineProperty(this, 'value', {
		get: function () { return value; },
		set: function (newvalue) { value = newvalue.toString(); }
	});
}

function Element(tag) {
	this.nodeType = 1;
	this.childNodes = [];
	this.attributes = new Attributes();
	
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

Element.prototype.getElementsByTagName = function (tagname) {
	var elements = [];
	
	tagname = tagname.toUpperCase();
	
	if (tagname === '*')
		elements.push(this);
	else if (tagname === this.tagName)
		elements.push(this);
		
	for (var n in this.childNodes) {
		var node = this.childNodes[n];
		var childElements = node.getElementsByTagName(tagname);
		elements = elements.concat(childElements);
	}
	
	return elements;
};

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

Document.prototype.getElementsByTagName = function (tagname) { return this.documentElement.getElementsByTagName(tagname); };

module.exports = {
	document: function () { return new Document(); }
};

