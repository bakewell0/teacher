async function checkUser(req,res) {
	const decodeToken=require("./token.js").decodeToken;
	const user=require("./model.js").user
	var token=decodeToken(req.body.token);	
	var _user = await user.findAll({ where:{id:token[0].id} });	
	if(_user.length < 1) {
		res.send({isSuccess:false});
		return;
	}
}

module.exports=checkUser;