//添加到购物车
function addShopCar(){
	this.exec = function(route, req, res){		
		add(req,res);
	}	
}

function add(req,res){
	var shopCar=require("../model.js").shopCar;     
    shopCar.create({
    	Image:req.body.Image,
  	    Name:req.body.Name,
  		Carriage:req.body.Carriage,
  		Destination:req.body.Destination,
  		Status:req.body.Status,
  		CurPrice:req.body.CurPrice,
  		OldPrice:req.body.OldPrice,
  		IsBook:req.body.IsBook,
  		Des:req.body.Des
    })
    .then(function(result){
    	res.send({isSuccess:true,result:result});
    })
}

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
