function productList(){
	this.exec = function(route, req, res){		
		list(res);
	}
}

function list(res){
	var product=require("../model.js").product;    
	product.findAll().then(function(result){
		res.send({isSuccess:true,result:result});	
    });	
}

module.exports=new productList();
