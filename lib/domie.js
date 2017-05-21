
function Document() {
	this.nodeType = 9;
}

module.exports = {
	document: function () { return new Document(); }
};

