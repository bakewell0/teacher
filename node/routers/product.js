const product = require("../model.js").product;
const upload = require("../upload.js").upload;

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
	var imgUrl = setProductImage(req);
	product.create({
		Name: data.Name,
		CurPrice: data.CurPrice,
		OldPrice: data.OldPrice,
		Des: data.Des,
		Carriage: data.Carriage,
		Destination: data.Destination,
		Image: imgUrl
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
		var imgUrl = setProductImage(req);
		dataobj = {
			Name: data.Name,
			CurPrice: data.CurPrice,
			OldPrice: data.OldPrice,
			Des: data.Des,
			Carriage: data.Carriage,
			Destination: data.Destination,
			Image: imgUrl
		};
	} else {
		dataobj = {
			Name: data.Name,
			CurPrice: data.CurPrice,
			OldPrice: data.OldPrice,
			Des: data.Des,
			Carriage: data.Carriage,
			Destination: data.Destination
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

//上传产品图片
function setProductImage(req) {
	var url = "http://39.108.219.59/img/productList/";
	var timestamp = new Date().getTime();
	if(req.files.Image) {
		upload(req.files.Image.path, '../data/img/productList/' + timestamp + "productImage.jpg");
		var imgUrl = url + timestamp + "productImage.jpg?ver=" + Math.random();
		return imgUrl;
	}
	return "";
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

module.exports = {
	productList: new productList(),
	productDetail: new productDetail(),
	addProduct: new addProduct(),
	offProduct: new offProduct(),
	onProduct: new onProduct(),
	updateProduct: new updateProduct(),
	productBrowseTimes: new productBrowseTimes()
}