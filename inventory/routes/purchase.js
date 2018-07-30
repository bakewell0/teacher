var express = require('express');
var router = express.Router();
var purchase = require("../model.js").purchase;
var manifest = require("../model.js").manifest;
// force: true will drop the table if it already exists
/*purchase.sync({force: true}).then(() => {
  
});*/

router.post('/add', (req, res, next) => {
	purchase.create({
		proname:req.body.proname,
		custname:req.body.custname,//客户id
		wharehousename:req.body.wharehousename,
		sum:req.body.sum
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', async (req, res, next) => {
	var params = {};
	if(req.body.purchaseid){
		params.id = req.body.purchaseid;
	}
	let purchases = await purchase.findAll({
		where:params
	});
	for(let i=0;i<purchases.length;i++){		
		let manifests =await manifest.findAll({
			where:{
				proname:purchases[i].dataValues.proname
			}
		});
		purchases[i].dataValues.goodsCart = manifests;		
	}
	res.json({
		isSuccess: true,
		result: purchases
	});
})

router.post('/delete', (req, res, next) => {
	purchase.destroy({
		where: {
			id: req.body.purchaseid
		}
	}).then((result) => {
		res.json({
			isSuccess: result?true:false,
			result: result
		});
	});
})

module.exports = router;