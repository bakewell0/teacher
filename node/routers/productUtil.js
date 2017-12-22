const product=require("../model.js").product;
const upload = require("../upload.js").upload;

async function getProduct(productId, productName) {
	var params = {};
	if (productId) {
		params.id = eval(productId);
	}
	if (productName) {
		params.Name = {$like: '%'+productName+'%'};
	}

	var products = await product.findAll({
		where:params
	});
	return products;
}

//上传产品图片   
function setProductImage(imgfile) {
	var url = "http://39.108.219.59/img/productList/";
	var timestamp = new Date().getTime();
	if(imgfile) {
		upload(imgfile.path, '../data/img/productList/' + timestamp + "productImage.jpg");
		var imgUrl = url + timestamp + "productImage.jpg?ver=" + Math.random();
		return imgUrl;
	}
	return "";
}


module.exports={
	getProduct: getProduct,
	setProductImage: setProductImage
}