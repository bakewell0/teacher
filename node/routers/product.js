const product = require("../model.js").product;
const productUtil = require("../services/productUtil.js");
const cache = require("../cache.js");

//获取产品结构体
function getProductObj(data) {
	return {
		Name: data.Name,
		CurPrice: data.CurPrice,
		OldPrice: data.OldPrice,
		Des: data.Des,
		Carriage: data.Carriage,
		Destination: data.Destination,
		isHot: data.isHot,
		isRecommend: data.isRecommend,
		typeId: data.typeId
	}
}

//产品列表
function productList() {
	this.exec = function(route, req, res) {
		list(req, res);
	}
}

async function list(req, res) {
	var params = {};
	var data = req.body;
	var allProducts = cache.get("allProducts");
	if(data) {
		if(data.productName) {
			params.name = {
				$like: '%' + data.productName + '%'
			}
		}
		if(data.typeId) {
			params.typeId = data.typeId;
		}
		if(data.isRecommend) {
			params.isRecommend = data.isRecommend;
		}
		if(data.isHot) {
			params.isHot = data.isHot;
		}
		if(data.isDelete) {
			params.isDelete = data.isDelete;
		}
	}

	var searchFlag = data.productName || data.typeId || data.isRecommend || data.isHot || data.isDelete;
	if(searchFlag || !allProducts) {
		var allProducts = await product.findAll({
			where: params
		})
		if(!searchFlag) {
			cache.put("allProducts", allProducts);
		}
	}
	res.send({
		isSuccess: true,
		result: allProducts
	});
}

//产品详情
function productDetail() {
	this.exec = function(route, req, res) {
		detail(req, res);
	}
}

function detail(req, res) {
	product.findAll({
		where: {
			id: req.body.id
		}
	}).then(function(result) {
		var data = {};
		data.product = result[0];
		data.ProductId = result[0].dataValues.id;
		data.ProductNumber = 1;
		res.send({
			isSuccess: true,
			result: data
		});
	});
}

//添加产品
function addProduct() {
	this.exec = function(route, req, res) {
		add(req, res);
	}
}

function add(req, res) {
	var data = req.body;
	var productObj = getProductObj(data);
	var imgUrl = productUtil.setProductImage(req.files.Image);
	if(imgUrl) {
		productObj.Image = imgUrl;
	}
	product.create(productObj).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		})
	});
}

//修改产品
function updateProduct() {
	this.exec = function(route, req, res) {
		update(req, res);
	}
}

function update(req, res) {
	var data = req.body;
	var productObj = getProductObj(data);
	if(req.files.Image) {
		var imgUrl = productUtil.setProductImage(req.files.Image);
		productObj.Image = imgUrl;
	}
	product.update(productObj, {
		where: {
			id: data.id
		}
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

//增加商品浏览次数
function productBrowseTimes() {
	this.exec = function(route, req, res) {
		times(req, res);
	}
}

function times(req, res) {
	var data = req.body;
	product.update({
		BrowseTimes: data.BrowseTimes
	}, {
		where: {
			id: data.id
		}
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

//获取三个热卖或推荐产品
function getHotRecommend() {
	this.exec = function(route, req, res) {
		hotOrRecommend(req, res);
	}
}

function hotOrRecommend(req, res) {
	var type = req.body.type.toUpperCase();
	var params = {};

	if(type == 'H') {
		params = {
			where: {
				isHot: 1,
				isDelete: 0
			},
			limit: 3
		}

	} else if(type == 'R') {
		params = {
			where: {
				isRecommend: 1,
				isDelete: 0
			},
			limit: 15
		}
	}

	product.findAll(params).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

//上架产品
function changeState() {
	this.exec = function(route, req, res) {
		state(req, res);
	}
}

function state(req, res) {
	var type = req.body.type.toUpperCase();
	var params = {};
	if(type == "D") {
		params.isDelete = req.body.value;
	}
	if(type == "R") {
		params.isRecommend = req.body.value;
	}
	if(type == "H") {
		params.isHot = req.body.value;
	}
	product.update(params, {
		where: {
			id: req.body.id
		}
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

module.exports = {
	productList: new productList(),
	productDetail: new productDetail(),
	addProduct: new addProduct(),
	changeState: new changeState(),
	updateProduct: new updateProduct(),
	productBrowseTimes: new productBrowseTimes(),
	getHotRecommend: new getHotRecommend()
}