function productList(){
	this.exec = function(route, req, res){		
		list(req, res);
	}
}

function list(req,res){
	var product=require("../model.js").product;
	var params = {};
	if(req.body&&req.body.productName){
		params={
			Name:{$like: '%'+req.body.productName+'%'}
		}
	}	
	product.findAll({
		where:params
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
    });	
}

module.exports=new productList();
