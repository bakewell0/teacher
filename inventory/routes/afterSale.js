var express = require('express');
var router = express.Router();
var afterSale = require("../model.js").afterSale;
var customer = require("../model.js").customer;

// force: true will drop the table if it already exists
/*afterSale.sync({force: true}).then(() => {
  
});*/

router.post('/add', (req, res, next) => {
	afterSale.create({
		customerid: req.body.customerid, //客户
		breakdown: req.body.breakdown, //故障
		iswarranty: req.body.iswarranty, //保修期内0，保修期外1
		ischarge: req.body.ischarge, //收费0，免费1
		aftercontent: req.body.aftercontent, //售后内容
		price: req.body.price //收费标准
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', async(req, res, next) => {
	var afters = await afterSale.findAll();
	var custs = await customer.findAll();
	afters.forEach((after) => {
		custs.forEach((cust) => {
			if(after.customerid == cust.id) {
				console.log("sssssss")
				after.dataValues.name = cust.name;
				after.dataValues.linkman = cust.linkman;
				after.dataValues.telephone = cust.telephone;
				console.log(after);
			}
		})
	})

	res.json({
		isSuccess: true,
		result: afters
	});
});

module.exports = router;