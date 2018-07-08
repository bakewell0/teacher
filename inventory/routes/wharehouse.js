var express = require('express');
var router = express.Router();
var wharehouse = require("../model.js").wharehouse;
// force: true will drop the table if it already exists
/*wharehouse.sync({force: true}).then(() => {
  
});*/

router.post('/add', (req, res, next) => {
	wharehouse.create({
		name:req.body.name,//仓库名称
		addr:req.body.addr,//仓库地址
		note:req.body.note//备注
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', (req, res, next) => {
	wharehouse.findAll().then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
});

module.exports = router;