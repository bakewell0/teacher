var Sequelize=require("sequelize");
var sequelize = new Sequelize('wscainiao', 'root', 'Zjb901702', {
	host: 'rm-wz9356mzg6pyvry5ko.mysql.rds.aliyuncs.com',
	dialect: 'mysql'
});
module.exports=sequelize;
