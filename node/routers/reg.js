function Reg(){
	this.exec = function(route, req, res){
		res.setHeader('Access-Control-Allow-Origin','*');     
		register(req.body,function(json){
	   		if(json.isSuccess){
	   	  		res.send(json);
	   		}
	   		else{
	   	  		res.send("注册失败");
	   		}
		});  
	}
}

function register(params,callback){
	var Sequelize=require("sequelize");
	var sequelize=require("../connect.js");
	var user = sequelize.define('user', {
		phone:Sequelize.STRING,
		email:Sequelize.STRING,
		password:Sequelize.STRING
	});	
	/*user.sync({force: true}).then(() => {
		  return user.create({
		  	phone:params.phone,
		    email:params.email,
		    password:params.password
		  })
   });*/
    user.create({
		  	phone:params.phone,
		    email:params.email,
		    password:params.password
    }).then(function(){
       callback({isSuccess:true,des:"注册成功"});
    })
}
module.exports=new Reg();
