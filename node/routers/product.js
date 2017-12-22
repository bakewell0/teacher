const product = require("../model.js").product;
const productUtil = require("./productUtil.js");

//产品列表
function productList() {
	this.exec = function(route, req, res) {
		list(req, res);
	}
}

function list(req, res) {
	var params = {};
	if(req.body && req.body.productName) {
		params = {
			Name: {
				$like: '%' + req.body.productName + '%'
			}
		}
	}
	product.findAll({
		where: params
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		});
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
	var imgUrl = productUtil.setProductImage(req.files.Image);
	product.create({
		Name: data.Name,
		CurPrice: data.CurPrice,
		OldPrice: data.OldPrice,
		Des: data.Des,
		Carriage: data.Carriage,
		Destination: data.Destination,
		Image: imgUrl,
		isHot: data.isHot,
		isRecommend: data.isRecommend,
		typeId: data.typeId
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		})
	});
}

//上架产品
function onProduct() {
	this.exec = function(route, req, res) {
		on(req, res);
	}
}

function on(req, res) {
	product.update({
		isDelete: 0
	}, {
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

//下架产品
function offProduct() {
	this.exec = function(route, req, res) {
		off(req, res);
	}
}

function off(req, res) {
	//软删除商品
	product.update({
		isDelete: 1
	}, {
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

//修改产品
function updateProduct() {
	this.exec = function(route, req, res) {
		update(req, res);
	}
}

function update(req, res) {
	var data = req.body;
	var dataobj = {};
	if(req.files.Image) {
		var imgUrl = productUtil.setProductImage(req.files.Image);
		dataobj = {
			Name: data.Name,
			CurPrice: data.CurPrice,
			OldPrice: data.OldPrice,
			Des: data.Des,
			Carriage: data.Carriage,
			Destination: data.Destination,
			Image: imgUrl,
			isHot: data.isHot,
			isRecommend: data.isRecommend,
			typeId: data.typeId
		};
	} else {
		dataobj = {
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
	product.update(dataobj, {
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
	var type = req.body.type.toUpperCase;
	var params = {};
	
	if(type == 'H') {
		params = {
			isHot: 1
		}
	}else if (type == 'R'){
		params = {
			isRecommend: 1
		}
	}
	
	product.findAll({
		where: params,
		limit: 3
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

//按产品类别获取产品
function getProductByType() {
	this.exec = function(route, req, res) {
		byType(req, res);
	}
}

function byType(req, res) {
	product.findAll({
		where: {
			typeId: req.body.typeId
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
	offProduct: new offProduct(),
	onProduct: new onProduct(),
	updateProduct: new updateProduct(),
	productBrowseTimes: new productBrowseTimes(),
	getHotRecommend: new getHotRecommend(),
	getProductByType: new getProductByType()
}