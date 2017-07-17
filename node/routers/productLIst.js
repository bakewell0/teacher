function productList(){
	this.exec = function(route, req, res){		
		list(req.body,function(json){
			res.send(json);
		});
	}
}

function list(params,callback){
	var product=require("../model.js").product;    
	product.findAll().then(function(result){	
            callback({isSuccess:true,result:result});	
    });	
}

module.exports=new productList();
