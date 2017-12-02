var jwt = require('jwt-simple');

function encodeToken(userinfo){
	var token=jwt.encode(userinfo,"user");
	return token;
}

function decodeToken(token){
	var user = jwt.decode(token,"user");
	return user;
}

function getUserId(token){
	var token=decodeToken(token);
	var userId = token[0].id;	
	return userId;
}


module.exports={
	encodeToken:encodeToken,
	decodeToken:decodeToken,
	getUserId: getUserId
}
