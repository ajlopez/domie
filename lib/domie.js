
function findById(id, nodes) {
	var l = nodes.length;
	
	for (var k = 0; k < l; k++) {
		var node = nodes[k];
		
		if (node.nodeType != 1)
			continue;
			
		if (node.getAttribute('id') == id)
			return node;
			
		var found = findById(id, node.childNodes);
		
		if (found)
			return found;
	}
	
	return null;
}

function TextNode(value) {
	Object.defineProperty(this, 'nodeValue', {
		get: function () { return value; },
		set: function (newvalue) { value = newvalue; }
	});
}

Object.defineProperty(TextNode.prototype, 'nodeType', { get: function () { return 3; } });

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
	
	this.item = function (n) {
		var key = Object.keys(attrs)[n];
		return attrs[key];
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
	get: function () { 
		var result = '<' + this.tag;
		
		for (var k = 0; k < this.attributes.length; k++) {
			var attr = this.attributes.item(k);
			
			result += ' ' + attr.name + "=" + JSON.stringify(attr.value);
		}
		
		result += '>' + this.innerHTML + '</' + this.tag + '>'; 
		return result;
	}
});

Element.prototype.appendChild = function (node) {
	this.childNodes.push(node);
};

Object.defineProperty(Element.prototype, 'innerHTML', {
	get: function () { 
		var result = '';
		
		for (var n in this.childNodes) {
			var node = this.childNodes[n];
			
			if (node.nodeType == 3)
				result += node.nodeValue;
			else
				result += node.outerHTML;
		}

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

Element.prototype.getAttribute = function (name) {
	var attr = this.attributes.getNamedItem(name);
	
	if (attr)
		return attr.value;
		
	return null;
};

Element.prototype.getAttributeNode = function (name) {
	return this.attributes.getNamedItem(name);
};

function Document() {
	this.nodeType = 9;
	
	this.documentElement = new Element('html');
	this.documentElement.appendChild(new Element('head'));
	this.documentElement.appendChild(new Element('body'));
	
	this.createElement = function (tag) { return new Element(tag); };
	this.createAttribute = function (name) { return new Attribute(name); };
}

Document.prototype.createElement = function (tag) { return new Element(tag); };
Document.prototype.createAttribute = function (name) { return new Attribute(name); };
Document.prototype.createTextNode = function (text) { return new TextNode(text); };

Object.defineProperty(Document.prototype, 'nodeType', {
	get: function () { return 9; }
});

Document.prototype.getElementsByTagName = function (tagname) { return this.documentElement.getElementsByTagName(tagname); };

Document.prototype.getElementById = function (id) {
	return findById(id, [ this.documentElement ]);
}

module.exports = {
	document: function () { return new Document(); }
};

