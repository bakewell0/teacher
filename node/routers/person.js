function GetPerson(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function get(req,res){
	var decodeToken=require("../token.js").decodeToken;
	var user=require("../model.js").user;
	var token=decodeToken(req.body.token);	
	user.findAll({
		where:{id:token[0].id}
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
   });
}
//设置个人中心
function SetPerson(){
	this.exec = function(route, req, res){   
		set(req,res);  
	}
}

function set(req,res){
	var user=require("../model.js").user; 
	var decodeToken=require("../token.js").decodeToken;
	var token=decodeToken(req.body.token);
    user.update({
			name: req.body.name,
			gender:req.body.gender,
			address:req.body.address
		}, 
		{
			where: {
				id:token[0].id
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
	var url="http://39.108.219.59:8080/img/upload/";
	this.exec = function(route, req, res){  		
		var token=decodeToken(req.body.token);		
		//上传头像
		upload(req.files.file.path,'../data/img/upload/'+token[0].id+"headImage.jpg");  
	    //更新头像url
	    user.update({
			headImage:url+token[0].id+"headImage.jpg?ver="+Math.random()
		}, 
		{
			where: {
				id:token[0].id
			}
		})
		.then(function(result) {
			res.send({isSuccess:true,des:"设置头像成功",
			headImage:url+token[0].id+"headImage.jpg?ver="+Math.random()});
		});
	}
}

module.exports={
	getPerson:new GetPerson(),
	setPerson:new SetPerson(),
	setHeadImage:new SetHeadImage()
}