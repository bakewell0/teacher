function GetPerson(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function get(req,res){
	var decodeToken=require("../token.js").decodeToken;
	var user=decodeToken(req.body.token);
    res.send({isSuccess:true,result:user})
}
//设置个人中心
function SetPerson(){
	this.exec = function(route, req, res){   
		set(req,res);  
	}
}

function set(req,res){
	var user=require("../model.js").user;   
    user.update({
			headImage:req.body.headImage,
			name: req.body.name
		}, 
		{
			where: {
				id: req.body.id
			}
		})
		.then(function(result) {
			res.send({isSuccess:true,des:"修改成功"});
		});
}

module.exports={
	getPerson:new GetPerson(),
	setPerson:new SetPerson()
}