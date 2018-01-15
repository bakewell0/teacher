var setSchedule = require('./schedule.js').setSchedule;
var cache = require("./cache.js");
var time = [1, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];

function initSchedule() {
	clearCache();
}

function clearCache() {
	setSchedule(time, function() {
		cache.removeAll();
	});
}

module.exports = initSchedule();