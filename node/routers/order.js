const Sequelize=require("sequelize");
const sequelize=require("../connect.js");
const decodeToken=require("../token.js").decodeToken;
const user=require("../model.js").user;
const order=require("../model.js").order;
const orderDetail=require("../model.js").orderDetail;

function GetOrder(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function get(req,res){

	
}

function GetOrderDetail(){
	this.exec = function(route, req, res){		
	    getDetail(req,res);
	}
}

function getDetail(req,res){

	
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

async function add(req,res){
	var data = req.body;
	var token=decodeToken(data.token);
	//验证user
	checkUser(req,res);
	
	var _order = await order.create({
		userId: token[0].id,
		totalCost: data.totalCost,
		totalNum: data.totalNum,
		isInvoice: data.isInvoice,
		message: data.message,
		state: data.state
	});
	
	//获取新插入的orderid
	var orderid = await sequelize.query('select last_insert_id() FROM orders');
	orderid = orderid[0].length;
	
	var productId = data.productId;
	var orderDetails = [];
	
	if(typeof(productId) != 'object') {
		productId = eval(productId);
	}
	
	productId.map(function (item){
		var _orderDetail = {
			orderId: orderid,
			productId: item,
			userId: 1
		}
		orderDetails.push(_orderDetail);
	})
	
	orderDetail.bulkCreate(orderDetails)
    .then(function (result) {
   		res.send({isSuccess:true});
    })
	
}

module.exports={
	getOrder:new GetOrder(),
	addOrder:new AddOrder(),
	getOrderDetail: new GetOrderDetail()
}