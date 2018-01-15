var schedule = require("node-schedule");
var j = null;

function setSchedule(time, callback) {
	var rule = new schedule.RecurrenceRule();
	rule.minute = time;
	j = schedule.scheduleJob(rule, callback);
}

function cancelSchedule() {
	j.cancel();
}

module.exports = {
	setSchedule: setSchedule,
	cancelSchedule: cancelSchedule
};