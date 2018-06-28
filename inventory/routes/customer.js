var express = require('express');
var router = express.Router();
var customer = require("../model.js").customer;
// force: true will drop the table if it already exists
/*customer.sync({
	force: true
}).then(() => {

});*/
router.post('/addCustomer', async(req, res, next) => {
	var cust = await customer.create({
		name: req.body.name,
		category: req.body.category,
		linkman: req.body.linkman,
		telephone: req.body.telephone,
		taxNum: req.body.taxNum,
		property: req.body.property
	});
	res.json({
		success: true
	});
});

router.get('/getCustomerList', async(req, res, next) => {
	var customerList = await customer.findAll();
	res.json({
		customerList: customerList
	});
})

module.exports = router;