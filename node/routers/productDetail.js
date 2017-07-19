function productDetail(){
	this.exec = function(route, req, res){		
		detail(req,res);
	}
}

function detail(req,res){
	var product=require("../model.js").product;  		    
	product.findAll({
        where:{
        	id:req.body.id
        }
    }).then(function(result){
    	res.send({isSuccess:true,result:result});
    });	
}

module.exports=new productDetail();
