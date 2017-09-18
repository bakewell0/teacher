const browselog = require("../model.js").browselog;
const getUserId = require("../token.js").getUserId;
const productUtil = require("./product.js");
var sequelize=require("../connect.js");

function GetBrowseLog(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function AddBrowseLog(){
	this.exec = function(route, req, res){
	    add(req,res);
	}
}

function DelBrowseLog(){
	this.exec = function(route, req, res){		
	    del(req,res);
	}
}

async function get(req,res){
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	
	var browselogs = await browselog.findAll({
		where: {
			userId: getUserId(req.body.token)
		},
		order:sequelize.col("updatedAt")
	})
	
	var browselogData = [];
	
	if(browselogs.length) {
		var preTime = browselogs[0].dataValues.updatedAt.toLocaleDateString();
		var browse = {};
		browse.browselogs = [];
	}
	
	for(var i = 0; i < browselogs.length; ) {
		var curTime = browselogs[i].dataValues.updatedAt.toLocaleDateString();
		if (curTime == preTime) {
			browse.dateTime = curTime;
			var productId = browselogs[i].dataValues.productId;
			browselogs[i].dataValues.product = await productUtil.getProduct(productId);
			browse.browselogs.push(browselogs[i].dataValues);	
			i++;	
		}else {
			preTime = browselogs[i].dataValues.updatedAt.toLocaleDateString();
			browselogData.push(browse);
			browse = {};
			browse.browselogs = [];
		}
	}
	
	browselogData.push(browse);
	
	res.send({ isSuccess: true, result: browselogData})
}

async function add(req,res){
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	if(!req.body.productId) {
		res.send({ isSuccess: false, result: '商品ID不能为空' })
		return;
	}
	var _browselog = await browselog.findOrCreate({
	where: {
  		userId:getUserId(req.body.token),
  		productId:req.body.productId
    },
    defaults: {
        userId:getUserId(req.body.token),
  		productId:req.body.productId
    }
  });
  
  if (!_browselog[1]) {
  	browselog.update(
		{ updatedAt: new Date()},
		{ where: { 
			userId:getUserId(req.body.token),
  			productId:req.body.productId
		}
	})
  	res.send({isSuccess: true, result:'商品已浏览'});
  }else {
  	res.send({isSuccess: true, result:'商品浏览'});
  }
}

function del(req,res) {
	var data = req.body;
	browselog.destroy({
		where:{
			userId: getUserId(data.token)
		}
	}).then(function(result){
		res.send({isSuccess:true,result:result});	
	});
}

module.exports={
	getBrowseLog:new GetBrowseLog(),
	addBrowseLog:new AddBrowseLog(),
	delBrowseLog:new DelBrowseLog()
}