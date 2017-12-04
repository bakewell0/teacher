const user = require("../model.js").user;

function addUser(){
	this.exec = function(route, req, res){		
	    add(req,res);
	}
}

function add(req,res){
	var data = req.body;
	user.create({
		name: data.name,
		phone: data.phone,
		qq: data.qq,
		type: data.type
	}).then(function(result){
		res.send({isSuccess:true, result: result})
	});
}

function getUser(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

function get(req,res){
	user.findAll().then(function(result) {
		res.send({isSuccess:true, result: result})
	});
}

function checkPhone() {
	this.exec = function(route, req, res){		
	    check(req,res);
	}
}

function check(req,res) {
	var data = req.body;
	user.findAll({
		where:{
			phone: data.phone,
			type: data.type
		}
	}).then(function(result) {
		res.send({isSuccess:true, result: result})
	});
}

function delUser(){
	this.exec = function(route, req, res){		
	    del(req,res);
	}
}

function del(req,res){
	var data = req.body;
	user.destroy({
		where:{
			id: req.body.id,
		}
	}).then(function(result) {
		res.send({isSuccess:true, result: result})
	});
}


module.exports={
	addUser:new addUser(),
	getUser:new getUser(),
	checkPhone:new checkPhone(),
	delUser:new delUser()
}