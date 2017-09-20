const tokenUtil=require("../token.js");
const order=require("../model.js").order;
const productUtil = require("./product.js");
const delComment=require("./comment.js").delComment;
const findUserOrders = require("./orderUtil.js").findUserOrders;

function GetOrder(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

async function get(req,res){
	try {
		var ordersData = [];
		//获取所有订单信息
		var orders = await findUserOrders(req.body.token);
		for(let i = 0; i<orders.length; i++) {
			//获取产品信息
			var data = orders[i].dataValues;
			var products = await productUtil.getProduct(orders[i].productId, req.body.productName);
			if (products.length) {
				data.products = await productUtil.getProduct(orders[i].productId);
				ordersData.push(data);
			}
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
		var orderDetail = await findUserOrders(req.body.token, req.body.orderId);
		orderDetail = orderDetail[0].dataValues;
		//获取订单中的产品信息
		orderDetail.products = await productUtil.getProduct(orderDetail.productId);
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
	if(!data.productId){
		res.send({isSuccess:true, result: "商品ID不能为空"});
		return;
	}
	if(!data.productNum){
		res.send({isSuccess:true, result: "商品数量不能为空"});
		return;
	}
	order.create({
		userId: tokenUtil.getUserId(data.token),
		totalCost: data.totalCost,
		totalNum: data.totalNum,
		isInvoice: data.isInvoice,
		message: data.message,
		state: data.state,
		productId: data.productId,
		productNum: data.productNum,
		orderTitle: data.orderTitle
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
			userId: tokenUtil.getUserId(data.token)
		}
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
	});
	//订单有评价，则删除评价
	try{
		delComment(req,res);
	}
	catch(e){
		console.log(e);
	}	
}


module.exports={
	getOrder:new GetOrder(),
	addOrder:new AddOrder(),
	getOrderDetail: new GetOrderDetail(),
	delOrder: new DelOrder()
}