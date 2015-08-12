var Readable = require('readable-stream').Readable;
var inherits = require('inherits');

function InputStringStream(str) {
	Readable.call(this);
	this.setEncoding('utf-8');
	this._data = new Buffer(str);
	this._offset = 0;
}

inherits(InputStringStream, Readable);

InputStringStream.prototype._read = function(size) {
	var inAvail = this._data.size - this._offset;
	if (inAvail <= 0) return this.push(null);
	var end = this._offset + size;
	this.push(this._data.slice(this._offset, end));
	this._offset = end;
}

module.exports = InputStringStream;
