var Writable = require('readable-stream').Writable;
var inherits = require('inherits');

function WriteStringStream() {
	Writable.call(this);
	this.setDefaultEncoding('utf-8');
	this._data = [];
}

inherits(WriteStringStream, Writable);

WriteStringStream.prototype._write = function(chunk, encoding, callback) {
	this._data.push(chunk);
	callback(null);
};

WriteStringStream.prototype._writev = function(chunks, callback) {
	Array.prototype.push.apply(this._data, chunks);
	callback(null);
};

WriteStringStream.prototype.toString = function() {
	return Buffer.concat(this._data).toString();
};

module.exports = WriteStringStream;
