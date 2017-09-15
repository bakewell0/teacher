const comments = require("../model.js").comments;
const getUserId = require("../token.js").getUserId;

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

async function add(req, res) {
	//插入购物车
	if(!req.body.orderId) {
		res.send({ isSuccess: false, result: '订单ID不能为空' })
		return;
	}
	if(!req.body.userId) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	var comments = await comments.findOrCreate({
		where: {
			orderId: req.body.orderId,
			userId: getUserId(req.body.token)
		},
		defaults: {
			orderId: req.body.orderId,
			userId: getUserId(req.body.token),
			content: req.body.content,
			describeScore: req.body,
			logisticsScore: req.body,
			serviceScore: req.body
		}
	});
};

function get(req, res) {
	comments.findAll({
		where: {
			userId: getUserId(req.body.token)
		}
	}).then(function(result) {
		res.send({ isSuccess: true, result: result });
	})
}

module.exports = {
	getComment: new getComment(),
	addComment: new addComment()
}