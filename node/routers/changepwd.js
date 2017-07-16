function ChangePwd() {
	this.exec = function(route, req, res) {
		change(req.body, function(json) {
			res.send(json);
		})
	}
}

function change(params, callback) {
	var user = require("../model.js").user;
	    user.update({
				password: params.password
			}, 
			{
			where: {
				phone: params.phone
			}
			})
			.then(function(result) {
				if(result[0]) {
					callback({ isChange: true });
				}
				else {
					callback({ isChange: false });
				}
		});
}

module.exports = new ChangePwd();