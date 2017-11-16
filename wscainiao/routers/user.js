function addUser(){
	this.exec = function(route, req, res){		
	    add(req,res);
	}
}

function add(req,res){
	var user=require("../model.js").user;
	var data = req.body;
	user.create({
		name: data.name,
		phone: data.phone,
		qq: data.qq
	}).then(function(result){
		res.send({isSuccess:true, result: result})
	});
}

module.exports=new addUser();
