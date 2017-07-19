function ChangePwd() {
	this.exec = function(route, req, res) {
		change(req,res)
	}
}

function change(req, res) {
	var user = require("../model.js").user;
	    user.update({
				password: req.body.password
			}, 
			{
			where: {
				phone: req.body.phone
			}
			})
			.then(function(result) {
				if(result[0]) {
					res.send({ isChange: true });
				}
				else {
					res.send({ isChange: false });
				}
		});
}

module.exports = new ChangePwd();