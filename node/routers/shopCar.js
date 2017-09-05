const shopCar=require("../model.js").shopCar;   
const tokenUtil=require("../token.js");
const product=require("../model.js").product; 
var sequelize=require("../connect.js");

//添加到购物车
function addShopCar(){
	this.exec = function(route, req, res){		
		add(req,res);
	}	
}

async function add(req,res){
  //插入购物车
  if(!req.body.id) {
  	res.send({isSuccess: false, result:'商品ID不能为空'})
  	return;
  }
  var _shopCar = await shopCar.findOrCreate({
	where: {
    		ProductId: req.body.id,
  		UserId:tokenUtil.getUserId(req.body.token)
    },
    defaults: {
        ProductId: req.body.id,
  		UserId:tokenUtil.getUserId(req.body.token),
  		ProductNumber: 1
    }
  });
  
  if (!_shopCar[1]) {
  	var data = _shopCar[0].dataValues;
  	data.ProductNumber = parseInt(data.ProductNumber) + 1;
  	// 更新shopcar
  	await updateNum(data, req.body.token);
	res.send({isSuccess: true, result:'购物车更新成功'});
  }else {
  	res.send({isSuccess: true, result:'购物车添加成功'})
  }
};

//获取购物车信息
function getShopCar(){
	this.exec = function(route, req, res){		
		get(req,res);
	}
}

async function get(req,res){
	var shopCarData = [];
	var productIds = [];
	var shopCars = await shopCar.findAll({
		where:{UserId:tokenUtil.getUserId(req.body.token)},
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
			id:req.body.id,
			UserId:tokenUtil.getUserId(req.body.token)
		}
	})
	.then(function(result){
		res.send({isSuccess:true,result:result});	
	});
}

function updateShopCar() {
	this.exec = function(route, req, res) {
		update(req, res);
	}
}

async function update(req, res) {
	var products = req.body.products;
	for(var i = 0; i < products.length; i++) {
		await updateNum(products[i], req.body.token);
	}
	res.send({isSuccess: true, result: "购物车数量更新成功"})
}

async function updateNum(data, token) {
	var result = await shopCar.update(
		{ ProductNumber: data.ProductNumber },
		{ where: { 
			id: data.id,
			UserId:tokenUtil.getUserId(token)
		}
	})
	return result;
}


module.exports={
	addShopCar:new addShopCar(),
	getShopCar:new getShopCar(),
	delShopCar:new delShopCar(),
	updateShopCar: new updateShopCar()
};
