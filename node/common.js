const decodeToken=require("./token.js").decodeToken;

function getUserId(req){
	var token=decodeToken(req.body.token);
	var userId = token[0].id;	
	return userId;
}

module.exports={
	getUserId: getUserId
}