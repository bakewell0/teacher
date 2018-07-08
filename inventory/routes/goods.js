var express = require('express');
var router = express.Router();
var goods = require("../model.js").goods;
// force: true will drop the table if it already exists
/*goods.sync({
	force: true
}).then(() => {

});*/

router.post('/add', (req, res, next) => {
	goods.create({
		name: req.body.name,
		category: req.body.category, //类别
		brand: req.body.brand, //品牌
		model: req.body.model, //型号
		specific: req.body.specific, //规格
		supplier: req.body.supplier //供应商名称
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', (req, res, next) => {
	goods.findAll().then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
})

router.post('/delete', (req, res, next) => {
	goods.destroy({
		where: {
			id: req.body.goodsid
		}
	}).then((result) => {
		res.json({
			isSuccess: result ? true : false,
			result: result
		});
	});
})

router.post('/update', (req, res, next) => {
	goods.update({
		name: req.body.name,
		category: req.body.category, //类别
		brand: req.body.brand, //品牌
		model: req.body.model, //型号
		specific: req.body.specific, //规格
		supplier: req.body.supplier //供应商名称
	}, {
		where: {
			id: req.body.goodsid
		}
	}).then((result) => {
		res.json({
			isSuccess: result[0] ? true : false,
			result: result
		});
	});
})

module.exports = router;