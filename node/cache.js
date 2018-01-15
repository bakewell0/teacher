function CacheLRU() {
	this.cache = {};
	this.hash = {};
	this.miss = 0;
};

CacheLRU.prototype.get = function(key) {
	key = '_' + key;
	if(this.hash[key]) {
		this.hash[key] += 1
	}
	else {
		this.miss += 1
	};
	return JSON.parse(this.cache[key] || null);
};

CacheLRU.prototype.put = function(key, value) {
	key = '_' + key;
	this.cache[key] = new Buffer(JSON.stringify(value));
	this.hash[key] = 1;
	return this;
};

CacheLRU.prototype.remove = function(key) {
	key = '_' + key;
	delete this.cache[key];
	delete this.hash[key];
	return this;
};

CacheLRU.prototype.removeAll = function() {
	this.cache = {};
	this.hash = {};
	return this;
};

var cache = new CacheLRU();

module.exports = cache;