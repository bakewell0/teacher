function Reg(){
	this.exec = function(route, req, res){   
		register(req.body,function(json){
			res.send(json);
		});  
	}
}

function register(params,callback){
	var user=require("../model.js").user;   
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
    },function(){
			callback({isSuccess:false,des:"注册失败"});
    })
}
module.exports=new Reg();
