const decodeToken=require("../token.js").decodeToken;
const user=require("../model.js").user;
const order=require("../model.js").order;
const product=require("../model.js").product;
const checkUser=require("../auth.js");

function GetOrder(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

async function get(req,res){
	//验证user
	checkUser(req,res);
	var token=decodeToken(req.body.token);
	var userId = token[0].id;
	var ordersData = [];
	var orders = await order.findAll({
		where:{
			userId:userId
		}
	});
	for(let i = 0; i<orders.length; i++) {
		product.findAll({
			where:{id:eval(orders[i].productId)}
		}).then(function(result) {
			let data = orders[i].dataValues;					
			data.products=result;	
			ordersData.push(data);
			if(i == orders.length-1) {
				res.send({isSuccess: true, result: ordersData})
			}
	});
	}
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
	var token=decodeToken(data.token);
	order.destroy({
		where:{
			id: data.id,
			userId: token[0].id,
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