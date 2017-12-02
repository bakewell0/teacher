const result = require("../model.js").result;

function getResult(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function get(req,res){
	var data = req.body;
	var num = parseInt(Math.random()*3) + 1;
	result.findAll({
		where:{
			num: num,
			type: data.type
		}
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
   	});
}

module.exports=new getResult();