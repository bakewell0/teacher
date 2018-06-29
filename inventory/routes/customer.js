var express = require('express');
var router = express.Router();
var customer = require("../model.js").customer;

/*customer.sync({
	force: true
}).then(() => {

});*/

router.post('/add', (req, res, next) => {
	customer.create({
		name: req.body.name,
		category: req.body.category,
		linkman: req.body.linkman,
		telephone: req.body.telephone,
		taxNum: req.body.taxNum,
		property: req.body.property
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', (req, res, next) => {
	customer.findAll({
		where: {
			id: req.body.customerid
		}
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
})

router.post('/delete', (req, res, next) => {
	customer.destroy({
		where: {
			id: req.body.customerid
		}
	}).then((result) => {
		res.json({
			isSuccess: result?true:false,
			result: result
		});
	});
})

router.post('/update', (req, res, next) => {
	customer.update({
		name: req.body.name,
		category: req.body.category,
		linkman: req.body.linkman,
		telephone: req.body.telephone,
		taxNum: req.body.taxNum,
		property: req.body.property
	}, {
		where: {
			id: req.body.customerid
		}
	}).then((result) => {
		res.json({
			isSuccess: result[0]?true:false,
			result: result
		});
	});
})

module.exports = router;