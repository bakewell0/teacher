function ChangePwd(){
	  this.exec = function(route, req, res){
	  	res.setHeader('Access-Control-Allow-Origin','*');     
	    change(req.body,function(json){
	    		res.send(json);	    	
	    })	    
	    function change(params,callback){
	    	var Sequelize=require("sequelize");
	      var sequelize=require("../connect.js");
	    	var user = sequelize.define('user', {
				phone:Sequelize.STRING,
				email:Sequelize.STRING,
				password:Sequelize.STRING
	    	});		  
	    	
	    	user.update({
    			password:params.password
			},{
    			where:{
        			phone:params.phone
    			}
			}).then(function(result){
				if(result[0]){
					callback({isChange:true});
				}else{
					callback({isChange:false});
				}
			});
	    }
	  }
}
module.exports=new ChangePwd();
