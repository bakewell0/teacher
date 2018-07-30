var express = require('express');
var router = express.Router();
var staff = require("../model.js").staff;
// force: true will drop the table if it already exists
/*staff.sync({force: true}).then(() => {
  
});*/

router.post('/add', (req, res, next) => {
	staff.create({
		name:req.body.name,//名称
		telephone:req.body.telephone,//电话
		duty:req.body.duty,//岗位
		idcard:req.body.idcard,//身份证
		gender:req.body.gender,//性别
		family:req.body.family,//家庭情况
		employDate:req.body.employDate,//入职时间
		fullDate:req.body.fullDate,//转正时间
		familyphone:req.body.familyphone,//家庭电话
		familyaddr:req.body.familyaddr//家庭住址
	}).then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	})
});

router.post('/query', (req, res, next) => {
	staff.findAll().then((result) => {
		res.json({
			isSuccess: true,
			result: result
		});
	});
})

router.post('/delete', (req, res, next) => {
	staff.destroy({
		where: {
			id: req.body.staffid
		}
	}).then((result) => {
		res.json({
			isSuccess: result ? true : false,
			result: result
		});
	});
})

router.post('/update', (req, res, next) => {
	staff.update({
		name:req.body.name,//名称
		telephone:req.body.telephone,//电话
		duty:req.body.duty,//岗位
		idcard:req.body.idcard,//身份证
		gender:req.body.gender,//性别
		family:req.body.family,//家庭情况
		employDate:req.body.employDate,//入职时间
		fullDate:req.body.fullDate,//转正时间
		familyphone:req.body.familyphone,//家庭电话
		familyaddr:req.body.familyaddr//家庭住址
	}, {
		where: {
			id: req.body.staffid
		}
	}).then((result) => {
		res.json({
			isSuccess: result[0] ? true : false,
			result: result
		});
	});
})

router.post('/delete', (req, res, next) => {
	staff.destroy({
		where: {
			id: req.body.staffid
		}
	}).then((result) => {
		res.json({
			isSuccess: result?true:false,
			result: result
		});
	});
})


module.exports = router;