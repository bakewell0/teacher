var jwt = require('jwt-simple');

function encodeToken(userinfo){
	var token=jwt.encode(userinfo,"user");
	return token;
}

function decodeToken(token){
	var user = jwt.decode(token,"user");
	return user;
}

module.exports={
	encodeToken:encodeToken,
	decodeToken:decodeToken
}
