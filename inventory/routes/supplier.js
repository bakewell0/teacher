var express = require('express');
var router = express.Router();
var supplier = require("../model.js").supplier;
// force: true will drop the table if it already exists
/*supplier.sync({force: true}).then(() => {
  
});*/

router.post('/add', (req, res, next) => {
	supplier.create({
		name: req.body.name, //名称
		category: req.body.category, //类别
		linkman: req.body.linkman, //联系人
		telephone: req.body.telephone, //电话
		account: req.body.account, //开户行，账号
		taxNum: req.body.taxNum, //税号
		regAddr: req.body.regAddr, //注册地址
		property: req.body.property //属性
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', (req, res, next) => {
	supplier.findAll().then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
})

router.post('/delete', (req, res, next) => {
	supplier.destroy({
		where: {
			id: req.body.supplierid
		}
	}).then((result) => {
		res.json({
			isSuccess: result?true:false,
			result: result
		});
	});
})

module.exports = router;