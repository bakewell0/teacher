const collectionlog = require("../model.js").collectionlog;
const getUserId = require("../token.js").getUserId;
const productUtil = require("./product.js");
const product=require("../model.js").product;

function GetCollectionLog(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function AddCollectionLog() {
	this.exec = function(route, req, res){
	    add(req,res);
	}
}

function DelCollectionLog() {
	this.exec = function(route, req, res){		
	    del(req,res);
	}
}

function GetIsCollection() {
	this.exec = function(route, req, res){		
	    isCollection(req,res);
	}
}

async function get(req,res){
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	var collectionLogsData = [];
	var collectionLogs = await collectionlog.findAll({
		where: {
			userId: getUserId(req.body.token)
		}
	})
	
	for(var i = 0; i<collectionLogs.length; i++) {
		var data = collectionLogs[i].dataValues;
		data.product = await productUtil.getProduct(collectionLogs[i].productId);
		collectionLogsData.push(data);
	}
	
	res.send({isSuccess: true, result: collectionLogsData});
}

async function add(req,res) {
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	if(!req.body.productId) {
		res.send({ isSuccess: false, result: '商品ID不能为空' })
		return;
	}
	var _collectionlog = await collectionlog.findOrCreate({
	where: {
  		userId:getUserId(req.body.token),
  		productId:req.body.productId
    },
    defaults: {
        userId:getUserId(req.body.token),
  		productId:req.body.productId
    }
  });
  
  if (!_collectionlog[1]) {
  	res.send({isSuccess: true, result:'商品已收藏'});
  }else {
  	res.send({isSuccess: true, result:'收藏成功'})
  }
}

function del(req,res) {
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	if(!req.body.productId) {
		res.send({ isSuccess: false, result: '商品ID不能为空' })
		return;
	}
	collectionlog.destroy({
		where:{
			userId:getUserId(req.body.token),
  			productId:req.body.productId
		}
	})
	.then(function(result){
		res.send({isSuccess:true,result:result});	
	});
}

function isCollection(req,res) {
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	if(!req.body.productId) {
		res.send({ isSuccess: false, result: '商品ID不能为空' })
		return;
	}
	collectionlog.findAll({
		where: {
			userId: getUserId(req.body.token),
			productId:req.body.productId
		}
	}).then(function(result) {
		var isCollection = false;
		if(result.length){
			isCollection = true;
		}
		res.send({isSuccess:true,isCollection:isCollection});
	})
}

module.exports={
	getCollectionLog:new GetCollectionLog(),
	addCollectionLog:new AddCollectionLog(),
	delCollectionLog:new DelCollectionLog(),
	getIsCollection:new GetIsCollection()
}