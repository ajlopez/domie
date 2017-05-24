
function findTagStart(text, offset) {
	return text.indexOf('<', offset);
}

function findTagEnd(text, offset) {
	return text.indexOf('>', offset);
}

function findTagClose(text, offset) {
	var counter = 0;
	var pos = offset;
	
	while (true) {
		var pos = text.indexOf('<', pos);
		
		if (pos < 0)
			throw new Error('unclosed tag');
		
		if (text[pos + 1] === '/')
			if (counter === 0)
				return pos;
			else {
				counter--;
				pos++;
			}
		else {
			counter++;
			pos++;
		}
	}
}

function getTagName(text) {
	var result = '';
	var l = text.length;
	
	for (var k = 0; k < l && text[k] > ' ' && text[k] !== '>'; k++)
		result += text[k];
		
	return result;
}

function skipWhitespaces(text, length, position) {
	for (; position < length && text[position] <= ' '; position++)
		;
		
	return position;
}

function getAttributes(text, document) {
	var l = text.length;
	var k = 0;
	var result = [];
	
	while (true) {
		for (; k < l && text[k] > ' ' && text[k] !== '>' && text[k] !== '/'; k++)
			;
			
		var name = '';
		
		k = skipWhitespaces(text, l, k);

		for (; k < l && text[k] > ' ' && text[k] !== '=' && text[k] !== '>' && text[k] !== '/'; k++)
			name += text[k];

		if (name === '')
			return result;
		
		k = skipWhitespaces(text, l, k);
			
		var value = '';
			
		if (text[k] === '=') {
			k++;
			
			k = skipWhitespaces(text, l, k);
				
			var ch = text[k];
			
			if (ch === '"' || ch === "'") {
				k++;
				
				for (; k < l && text[k] !== ch; k++)
					value += text[k];
					
				if (text[k] === ch)
					k++;
			}
			else
				for (; k < l && text[k] > ' ' && text[k] !== '=' && text[k] !== '>' && text[k] !== '/'; k++)
					value += text[k];
		}
		
		var attr = document.createAttribute(name);
		attr.value = value;
		
		result.push(attr)
	}
}

function parse(text, document) {
	var result = [];
	
	if (text == null || text.length === 0)
		return result;
		
	for (var pos = findTagStart(text); pos >= 0; pos = findTagStart(text)) {
		if (pos > 0)
			result.push(document.createTextNode(text.substring(0, pos)));
			
		var posend = findTagEnd(text, pos);
		var posclose = findTagClose(text, posend);
		var posendclose = findTagEnd(text, posclose);
		
		var tagtext = text.substring(pos + 1, posend);
		var tagcontent = text.substring(posend + 1, posclose);
		
		var node = document.createElement(getTagName(tagtext));

		var children = parse(tagcontent, document);
		
		var n = children.length;
		
		for (var k = 0; k < n; k++)
			node.appendChild(children[k]);
			
		var attributes = getAttributes(tagtext, document);
		var n = attributes.length;
		
		for (var k = 0; k < n; k++)
			node.attributes.setNamedItem(attributes[k]);
			
		result.push(node);
		
		text = text.substring(posendclose + 1);
	}
	
	if (text && text.length)
		result.push(document.createTextNode(text));
	
	return result;
}

module.exports = {
	parse: parse
}
