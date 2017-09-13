const product=require("../model.js").product;

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

module.exports={
	getProduct: getProduct
}