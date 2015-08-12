var Writable = require('readable-stream').Writable;
var inherits = require('inherits');

function OutputStringStream() {
	Writable.call(this);
	this._data = [];
}

inherits(OutputStringStream, Writable);

OutputStringStream.prototype._write = function(chunk, encoding, callback) {
	this._data.push(chunk);
	callback(null);
};

OutputStringStream.prototype._writev = function(chunks, callback) {
	Array.prototype.push.apply(this._data, chunks);
	callback(null);
};

OutputStringStream.prototype.toString = function() {
	return Buffer.concat(this._data).toString();
};

module.exports = OutputStringStream;
