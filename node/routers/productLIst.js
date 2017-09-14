const productUtil = require("./product.js");

function productList(){
	this.exec = function(route, req, res){		
		list(req, res);
	}
}

async function list(req, res){
	var products = await productUtil.getProduct(null, req.body.productName);
	res.send({isSuccess:true,result:products});
}

module.exports=new productList();
