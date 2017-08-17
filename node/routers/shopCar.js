const shopCar=require("../model.js").shopCar;   
const decodeToken=require("../token.js").decodeToken;
const product=require("../model.js").product; 
var Sequelize=require("sequelize");
var sequelize=require("../connect.js");

//添加到购物车
function addShopCar(){
	this.exec = function(route, req, res){		
		add(req,res);
	}	
}

async function add(req,res){
  var user=decodeToken(req.body.token);
	//插入购物车
  var _shopCar = await shopCar.findOrCreate({
	where: {
    		ProductId: req.body.id,
  		UserId:user[0].id
    },
    defaults: {
        ProductId: req.body.id,
  		UserId:user[0].id,
  		ProductNumber: 1
    }
  });
  
  if (!_shopCar[1]) {
  	var data = _shopCar[0].dataValues;
  	var num = parseInt(data.ProductNumber) + 1;
	shopCar.update(
		{ ProductNumber: num },
		{ where: { id: data.id }
	}).then(function(result) {
	    res.send({isSuccess: true, result:'购物车更新成功'})
	});
  }else {
  	res.send({isSuccess: true, result:'购物车添加成功'})
  }
};	

//获取购物车信息 todo
function getShopCar(){
	this.exec = function(route, req, res){		
		get(req,res);
	}
}

async function get(req,res){
	var user=decodeToken(req.body.token);
	var shopCarData = [];
	var productIds = [];
	var shopCars = await shopCar.findAll({
		where:{UserId:user[0].id},
		order:sequelize.col("ProductId")
	});
	
	shopCars.map(function(item) {
		productIds.push(item.dataValues.ProductId);
	})
	
	product.findAll({
		where:{id:productIds}
	}).then(function(result) {
		for(let i = 0; i<shopCars.length; i++) {
			let data = shopCars[i].dataValues;					
			data.product=result[i];			
			shopCarData.push(data);
		}
		res.send({isSuccess: true, result: shopCarData})			
	});
}
//删除购物车
function delShopCar(){
	this.exec = function(route, req, res){		
		del(req,res);
	}		
}

function del(req,res){
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
