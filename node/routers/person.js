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
//设置头像
function SetHeadImage(){
	var decodeToken=require("../token.js").decodeToken;
	var upload = require("../upload.js").upload;
	var user=require("../model.js").user;   
	this.exec = function(route, req, res){  
		var token=decodeToken(req.body.token);		
		//上传头像
		upload(req.files.file.path,'./img/upload/'+token[0].id+"headImage.jpg");  
	    //更新头像url
	    user.update({
			headImage:token[0].id+"headImage.jpg"
		}, 
		{
			where: {
				id:token[0].id
			}
		})
		.then(function(result) {
			res.send({isSuccess:true,des:"设置头像成功",headImage:"http://192.168.0.109:8020/node/img/upload/"+token[0].id+"headImage.jpg"});
		});
	}
}

module.exports={
	getPerson:new GetPerson(),
	setPerson:new SetPerson(),
	setHeadImage:new SetHeadImage()
}