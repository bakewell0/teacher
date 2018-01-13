const tokenUtil = require("../token.js");
const order = require("../model.js").order;

async function findUserOrders(token, orderId) {
	var params = {
		userId: tokenUtil.getUserId(token)
	};
	if(orderId) {
		params.id = orderId;
	}
	var orders = await order.findAll({
		where: params,
		order: [
			['updatedAt', 'DESC']
		]
	});
	return orders;
}

module.exports = {
	findUserOrders: findUserOrders
}