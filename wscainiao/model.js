var Sequelize=require("sequelize");
var sequelize=require("./connect.js");
//个人中心接口
var user = sequelize.define('user', {
	name:Sequelize.STRING,
	phone:Sequelize.STRING,
	qq:Sequelize.STRING,
	type:Sequelize.STRING
});	

var result = sequelize.define('result', {
	result:Sequelize.STRING,
	type:Sequelize.STRING,
	num:Sequelize.STRING
});	

var models={
	user:user,
	result:result
}

module.exports=models;
