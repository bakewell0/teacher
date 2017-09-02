const decodeToken=require("./token.js").decodeToken;
const order=require("./model.js").order;
const product=require("./model.js").product;

function getUserId(token){
	var token=decodeToken(token);
	var userId = token[0].id;	
	return userId;
}

async function getProductById(productId) {
	var products = await product.findAll({
		where: {id: eval(productId)}
	})
	return products;
}

async function findUserOrders(token, orderId) {
	var params = {userId: getUserId(token)};
	if (orderId) {
		params.id = orderId;
	}
	var orders = await order.findAll({
		where:params
	}); 
	return orders;
}


module.exports={
	getUserId: getUserId,
	getProductById: getProductById,
	findUserOrders: findUserOrders
}