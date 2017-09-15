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
	
	product.update(
		{ ProductNumber: data.ProductNumber },
		{ where: { 
			id: data.id,
			UserId:tokenUtil.getUserId(token)
		}
	})
	
	res.send({isSuccess: true, result: collectionLogsData});
}

async function add(req,res) {
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