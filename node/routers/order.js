const decodeToken=require("../token.js").decodeToken;
const user=require("../model.js").user;
const order=require("../model.js").order;
const product=require("../model.js").product;

function GetOrder(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function get(req,res){
	//验证user
	checkUser(req,res);
	var token=decodeToken(req.body.token);
	var userId = token[0].id;
	order.findAll({
		where:{
			userId:userId
		}
	}).then(
		function(result){
			res.send({isSuccess:true, result: result});
		}
	);
}

function GetOrderDetail(){
	this.exec = function(route, req, res){		
	    getOrderDetail(req,res);
	}
}

async function getOrderDetail(req,res){
	//验证user
	checkUser(req,res);
	var token=decodeToken(req.body.token);
	var userId = token[0].id;	
	var orderDetail = await order.findAll({
		where:{
			userId: userId,
			id: req.body.orderId
		}
	})
	orderDetail = orderDetail[0].dataValues;
	var productIds = eval(orderDetail.productId);
	product.findAll({
		where:{
			id: productIds
		}
	}).then(function(result) {
		orderDetail.products = result;
		res.send({isSuccess:true, result: orderDetail})
		
	});
}

function AddOrder(){
	this.exec = function(route, req, res){   
		add(req,res);  
	}
}

async function checkUser(req,res) {
	var token=decodeToken(req.body.token);
	
	var _user = await user.findAll({ where:{id:token[0].id} });
	
	if(_user.length < 1) {
		res.send({isSuccess:false});
		return;
	}
}

function add(req,res){
	var data = req.body;
	var token=decodeToken(data.token);
	//验证user
	checkUser(req,res);
	
	order.create({
		userId: token[0].id,
		totalCost: data.totalCost,
		totalNum: data.totalNum,
		isInvoice: data.isInvoice,
		message: data.message,
		state: data.state,
		productId: data.productId
	}).then(function(result){
		res.send({isSuccess:true, result: result})
	});
}

module.exports={
	getOrder:new GetOrder(),
	addOrder:new AddOrder(),
	getOrderDetail: new GetOrderDetail()
}