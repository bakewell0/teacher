var express = require('express');
var router = express.Router();
var user = require("../model.js").user;
// force: true will drop the table if it already exists
user.sync({force: true}).then(() => {
  
});

router.post('/add', (req, res, next) => {
	user.create({
		name:req.body.name,//名称
		password:req.body.password,//密码
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', (req, res, next) => {
	user.findAll().then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
});

router.post('/delete', (req, res, next) => {
	user.destroy({
		where: {
			id: req.body.userid
		}
	}).then((result) => {
		res.json({
			isSuccess: result?true:false,
			result: result
		});
	});
})


module.exports = router;