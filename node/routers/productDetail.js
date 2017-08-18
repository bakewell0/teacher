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
    		var data={};
            data.product=result[0];           
    		data.ProductId = result[0].dataValues.id;
    		data.ProductNumber = 1;
    		res.send({isSuccess:true,result:data});
    });	
}

module.exports=new productDetail();
