function Login(){
	this.exec = function(route, req, res){		
	    login(req.body,function(json){			
				res.send(json);
		});
	}
}

function login(params,callback){
	var user=require("../model.js").user;	
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
        callback({islogin:islogin,result:result});	
    },
    function(error) {
    	callback({islogin:false});
    	console.log(error); // 堆栈跟踪
	})
}

module.exports=new Login();
