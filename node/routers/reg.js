function Reg(){
	this.exec = function(route, req, res){   
		register(req,res);  
	}
}

function register(req,res){
	var user=require("../model.js").user;   
	/*user.sync({force: true}).then(() => {
		  return user.create({
		  	phone:params.phone,
		    email:params.email,
		    password:params.password
		  })
    });*/
    user.create({
	  		phone:req.body.phone,
		    email:req.body.email,
		    password:req.body.password
    }).then(function(){
   			res.send({isSuccess:true,des:"注册成功"});
    },function(){
			res.send({isSuccess:false,des:"注册失败"});
    })
}
module.exports=new Reg();
