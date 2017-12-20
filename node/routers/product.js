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
		Image: imgUrl,
		BrowseTimes: 0
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		})
	});
}

//删除产品
function delProduct() {
	this.exec = function(route, req, res) {
		del(req, res);
	}
}

function del(req, res) {
	product.destroy({
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
	var imgUrl = setProductImage(req);
	product.update({
		Name: data.Name,
		CurPrice: data.CurPrice,
		OldPrice: data.OldPrice,
		Des: data.Des,
		Image: imgUrl,
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

//上传产品图片
function setProductImage(req) {
	var url = "http://39.108.219.59/img/productList/";
	var timestamp = new Date().getTime();
	upload(req.files.Image.path, '../data/img/productList/' + timestamp + "productImage.jpg");
	var imgUrl = url + timestamp + "productImage.jpg?ver=" + Math.random();
	return imgUrl;	
}

module.exports = {
	productList: new productList(),
	productDetail: new productDetail(),
	addProduct: new addProduct(),
	delProduct: new delProduct(),
	updateProduct: new updateProduct()
}