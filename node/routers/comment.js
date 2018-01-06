const comments = require("../model.js").comments;
const getUserId = require("../token.js").getUserId;
const findUserOrders = require("../services/orderUtil.js").findUserOrders;
const productUtil = require("../services/productUtil.js");

function addComment() {
	this.exec = function(route, req, res) {
		add(req, res);
	}
}

function getComment() {
	this.exec = function(route, req, res) {
		get(req, res);
	}
}

function add(req, res) {
	//插入购物车
	if(!req.body.orderId) {
		res.send({ isSuccess: false, result: '订单ID不能为空' })
		return;
	}
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	comments.findOrCreate({
		where: {
			orderId: req.body.orderId,
			userId: getUserId(req.body.token)
		},
		defaults: {
			orderId: req.body.orderId,
			userId: getUserId(req.body.token),
			content: req.body.content,
			describeScore: req.body.describeScore,
			logisticsScore: req.body.logisticsScore,
			serviceScore: req.body.serviceScore
		}
	}).then(function(result){
		res.send({"isSuccess":true,result:result})
	});
};

async function get(req, res) {
	var _comments=await comments.findAll({
		where: {
			userId: getUserId(req.body.token)
		}
	})	
	for(var i=0;i<_comments.length;i++){
		var orderId=_comments[i].orderId;		
		var orderDetail = await findUserOrders(req.body.token,orderId);
		orderDetail = orderDetail[0].dataValues;
		//获取订单中的产品信息
		
		orderDetail.products = await productUtil.getProduct(orderDetail.productId);
		_comments[i].dataValues.order=orderDetail;		
	}	
	res.send(_comments);
}

function delComment(req, res){
	comments.destroy({
		where:{
			orderId: req.body.orderId,
			userId: getUserId(req.body.token)
		}
	})
}

module.exports = {
	getComment: new getComment(),
	addComment: new addComment(),
	delComment:	delComment
}