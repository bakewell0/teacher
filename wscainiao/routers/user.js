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
		qq: data.qq
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
	user.findAll({
		where:{
			phone: req.body.phone
		}
	}).then(function(result) {
		res.send({isSuccess:true, result: result})
	});
}

module.exports={
	addUser:new addUser(),
	getUser:new getUser(),
	checkPhone:new checkPhone
}