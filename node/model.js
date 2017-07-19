var Sequelize=require("sequelize");
var sequelize=require("./connect.js");
//个人中心接口
var user = sequelize.define('user', {
	phone:Sequelize.STRING,
	email:Sequelize.STRING,
	password:Sequelize.STRING
});	
//产品列表接口
var product = sequelize.define('product', {
		Image:Sequelize.STRING,
  	    Name:Sequelize.STRING,
  		Carriage:Sequelize.STRING,
  		Destination:Sequelize.STRING,
  		Status:Sequelize.STRING,
  		CurPrice:Sequelize.STRING,
  		OldPrice:Sequelize.STRING,
  		IsBook:Sequelize.STRING,
  		Des:Sequelize.STRING
});

var models={
	user:user,
	product:product
}

module.exports=models;
