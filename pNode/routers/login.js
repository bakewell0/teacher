function Login(){
	this.exec = function(route, req, res){		
	    login(req,res);
	}
}

async function login(req,res){
	var user=require("../model.js").user;	
	var userinfo=await user.findAll({
        where:{
            phone:req.body.phone,
            password:req.body.password
        }   
  	});   
  	sendToken(userinfo,res);
}

function sendToken(userinfo,res){
	var encodeToken=require("../token").encodeToken
    if(userinfo[0]){
    	var token=encodeToken(userinfo);
    	res.send({islogin:true,token:token});	
    }
    else{
    	res.send({islogin:false});	
    }
}

module.exports=new Login();
