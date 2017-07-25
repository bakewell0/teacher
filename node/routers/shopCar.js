//添加到购物车
function addShopCar(){
	this.exec = function(route, req, res){		
		add(req,res);
	}	
}

async function add(req,res){
	var product=require("../model.js").product; 
	var shopCar=require("../model.js").shopCar;     
	//查询产品id
	var p = await product.findAll({
		where:{
			id:req.body.id
		}
	});
	//插入购物车
	shopCar.create({
    	Image:p[0].Image,
  	    Name:p[0].Name,
  		Carriage:p[0].Carriage,
  		Destination:p[0].Destination,
  		Status:p[0].Status,
  		CurPrice:p[0].CurPrice,
  		OldPrice:p[0].OldPrice,
  		IsBook:p[0].IsBook,
  		Des:p[0].Des
    })
	.then(function(result){
    	res.send({isSuccess:true,result:result});
   })
};	

//获取购物车信息
function getShopCar(){
	this.exec = function(route, req, res){		
		get(res);
	}
}

function get(res){
	var shopCar=require("../model.js").shopCar;    
	shopCar.findAll().then(function(result){
		res.send({isSuccess:true,result:result});	
    });	
}

//删除购物车
function delShopCar(){
	this.exec = function(route, req, res){		
		del(req,res);
	}		
}

function del(req,res){
	var shopCar=require("../model.js").shopCar;    
	shopCar.destroy({
		where:{
			id:req.body.id
		}
	})
	.then(function(result){
		res.send({isSuccess:true,result:result});	
	});
}

module.exports={
	addShopCar:new addShopCar(),
	getShopCar:new getShopCar(),
	delShopCar:new delShopCar()
};
