function Login(){
	this.exec = function(route, req, res){		
	    login(req,res);
	}
}

function login(req,res){
	var user=require("../model.js").user;	
	user.findAll({
        where:{
            phone:req.body.phone,
            password:req.body.password
        }
    }).then(function(result){
	    var islogin=false;
	    if(result[0]){
	    	islogin=true;
	    }
        res.send({islogin:islogin,result:result});	
    },
    function(error) {
    	res.send({islogin:false});
    	console.log(error); // 堆栈跟踪
	})
}

module.exports=new Login();
