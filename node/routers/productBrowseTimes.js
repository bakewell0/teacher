const product=require("../model.js").product;

function productBrowseTimes(){
	this.exec = function(route, req, res){		
		times(req, res);
	}
}

function times(req,res){
	var data = req.body;
	product.update(
		{ BrowseTimes: data.BrowseTimes },
		{ where: { 
			id: data.id
		}
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
    });
}

module.exports=new productBrowseTimes();
