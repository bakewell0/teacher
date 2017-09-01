const decodeToken=require("../token.js").decodeToken;
const user=require("../model.js").user;
const order=require("../model.js").order;
const product=require("../model.js").product;
const userId = require("../common.js");

function GetOrder(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

async function getProductById(productId) {
	var products = await product.findAll({
		where: {id: productId}
	})
	return products;
}

async function findUserOrders(req) {
	var params = {userId: userId.getUserId(req)};
	if (req.body.id) {
		params.id = orderId;
	}
	var orders = await order.findAll({
		where:params
	}); 
	return orders;
}

async function get(req,res){
	try {
		var ordersData = [];
		//获取所有订单信息
		var orders = await findUserOrders(req);
		for(let i = 0; i<orders.length; i++) {
			var productId = eval(orders[i].productId);
			//获取产品信息
			var products = await getProductById(productId);
			var data = orders[i].dataValues;
			data.products = products;
			ordersData.push(data);
		}
		res.send({isSuccess: true, result: ordersData});
	}catch(e) {
		res.send({isSuccess: false, result: "请重新登陆"});
	}
	
}

function GetOrderDetail(){
	this.exec = function(route, req, res){		
	    getOrderDetail(req,res);
	}
}

async function getOrderDetail(req,res){
	try {
		//获取某个订单信息
		var orderDetail = await findUserOrders(req);
		orderDetail = orderDetail[0].dataValues;
		
		//获取订单中的产品信息
		var productIds = eval(orderDetail.productId);
		orderDetail.products = await getProductById(productIds);
		
		res.send({isSuccess:true, result: orderDetail})
	}catch(e) {
		res.send({isSuccess:false, result: "订单信息不存在"});
		return;
	}
}

function AddOrder(){
	this.exec = function(route, req, res){   
		add(req,res);  
	}
}

function add(req,res){
	order.create({
		userId: userId.getUserId(),
		totalCost: data.totalCost,
		totalNum: data.totalNum,
		isInvoice: data.isInvoice,
		message: data.message,
		state: data.state,
		productId: data.productId,
		productNum: data.productNum
	}).then(function(result){
		res.send({isSuccess:true, result: result})
	});
}

function DelOrder(){
	this.exec = function(route, req, res){   
		del(req,res);  
	}
}


function del(req,res){
	order.destroy({
		where:{
			id: data.id,
			userId: userId.getUserId(),
		}
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
	});
}


module.exports={
	getOrder:new GetOrder(),
	addOrder:new AddOrder(),
	getOrderDetail: new GetOrderDetail(),
	delOrder: new DelOrder(),
}