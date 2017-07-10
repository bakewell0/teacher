
function Login(){
	this.exec = function(route, req, res){		
	    res.setHeader('Access-Control-Allow-Origin','*');	
	    if(req.body.phone&&req.body.password){
			login(req.body,function(json){			
			res.send(json);
			});	
	    }
		else{
			res.send("登录失败");
		}
	}
}

function login(params,callback){
	var Sequelize=require("sequelize");
	var sequelize=require("../connect.js");
	var user = sequelize.define('user', {
		phone:Sequelize.STRING,
		email:Sequelize.STRING,
		password:Sequelize.STRING
	});	
		
	user.findAll({
        where:{
            phone:params.phone,
            password:params.password
        }
    }).then(function(result){
    	    var islogin=false;
    	    if(result[0]){
    	    	islogin=true;
    	    }
            callback({islogin:islogin,result:result[0]});	
    });	
}

module.exports=new Login();
