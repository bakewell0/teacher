const decodeToken=require("./token.js").decodeToken;
const order=require("./model.js").order;
const product=require("./model.js").product;

function getUserId(req){
	var token=decodeToken(req.body.token);
	var userId = token[0].id;	
	return userId;
}

async function getProductById(productId) {
	var products = await product.findAll({
		where: {id: eval(productId)}
	})
	return products;
}

async function findUserOrders(req) {
	var params = {userId: getUserId(req)};
	if (req.body.id) {
		params.id = req.body.id;
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