const decodeToken=require("../token.js").decodeToken;
const user=require("../model.js").user;
const order=require("../model.js").order;
const product=require("../model.js").product;
const common = require("../common.js");

function GetOrder(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

async function get(req,res){
	try {
		var ordersData = [];
		//获取所有订单信息
		var orders = await common.findUserOrders(req.body.token, req.body.orderId);
		for(let i = 0; i<orders.length; i++) {
			//获取产品信息
			var data = orders[i].dataValues;
			data.products = await common.getProductById(orders[i].productId);
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
		var orderDetail = await common.findUserOrders(req.body.token, req.body.orderId);
		orderDetail = orderDetail[0].dataValues;
		//获取订单中的产品信息
		orderDetail.products = await common.getProductById(orderDetail.productId);
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
	var data = req.body;
	order.create({
		userId: common.getUserId(data.token),
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
	var data = req.body;
	order.destroy({
		where:{
			id: data.orderId,
			userId: common.getUserId(data.token)
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