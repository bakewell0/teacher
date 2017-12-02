function Reg(){
	this.exec = function(route, req, res){   
		register(req,res);  
	}
}

async function register(req,res){
	var user=require("../model.js").user;   
	/*user.sync({force: true}).then(() => {
		  return user.create({
		  	phone:params.phone,
		    email:params.email,
		    password:params.password
		  })
    });*/
   var params = [];
   if(req.body.phone) {
   	 params.push({phone: req.body.phone});
   }
   if(req.body.email) {
   	 params.push({email: req.body.email});
   }
   var _user = await user.findOrCreate({
	    	where: {
	    		$or: params
	    	},
	    	defaults: {
	    		phone:req.body.phone,
	    		email:req.body.email,
			password:req.body.password
	    	}
   })
	if (_user[1]) {
		res.send({isSuccess: true, result:"注册成功"});
	}else {
		res.send({isSuccess: false, result:'该用户已存在'});
	}
}

module.exports=new Reg();
