var express = require('express');
var router = express.Router();
var promanage = require("../model.js").promanage;
var manifest = require("../model.js").manifest;
// force: true will drop the table if it already exists
/*promanage.sync({
	force: true
}).then(() => {
	
});

manifest.sync({
	force: true
}).then(() => {
	
});*/

router.post('/add', (req, res, next) => {
	promanage.create({
		proname: req.body.proname, //项目名称
		custname: req.body.custname //客户名称
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
	/*货物清单入库*/
	var data = [];
	var goodsCart = req.body.goodsCart;
	for(var i=0;i<goodsCart.length;i++){
		data.push({
			name:goodsCart[i].name,//名称
			quantity:goodsCart[i].quantity,//数量
			buyprice:goodsCart[i].buyprice,//进价
			sellprice:goodsCart[i].sellprice,//售价
			supplier:goodsCart[i].supplier,//供应商
			isget:goodsCart[i].isget,//到货情况
			proname:req.body.proname,//项目名称
			custname:req.body.custname//客户名称
		})
	}
	manifest.bulkCreate(data);
});

router.post('/query', async (req, res, next) => {
	var params = {};
	if(req.body.proid){
		params.id = req.body.proid;
	}
	let pros = await promanage.findAll({
		where:params
	});
	for(let i=0;i<pros.length;i++){		
		let manifests =await manifest.findAll({
			where:{
				proname:pros[i].dataValues.proname
			}
		});
		pros[i].dataValues.goodsCart = manifests;		
	}
	res.json({
		isSuccess: true,
		result: pros
	});
})

router.post('/delete', (req, res, next) => {
	promanage.destroy({
		where: {
			id: req.body.proid
		}
	}).then((result) => {
		res.json({
			isSuccess: result,
			result: result
		});
	});
})

module.exports = router;