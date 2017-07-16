function productDetail(){
	this.exec = function(route, req, res){   
		detail(req.body,function(json){
			res.send(json);
		});
	}
}

function detail(params,callback){
	var product=require("../model.js").product;  		    
	product.findAll({
        where:{
        	id:params.id
        }
    }).then(function(result){	
        callback({isSuccess:true,result:result});	
    });	
}

module.exports=new productDetail();
