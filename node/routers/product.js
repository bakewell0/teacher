const product=require("../model.js").product;

async function getProductById(productId) {
	var products = await product.findAll({
		where: {id: eval(productId)}
	})
	return products;
}

module.exports={
	getProductById: getProductById
}