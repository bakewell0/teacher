function Person(){
	this.exec = function(route, req, res){		
	    person(req,res);
	}
}

function person(req,res){
	var decodeToken=require("../token.js").decodeToken;
	var user=decodeToken(req.body.token);
    res.send({isSuccess:true,result:user})
}

module.exports=new Person();