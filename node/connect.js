var Sequelize=require("sequelize");
var sequelize = new Sequelize('tiaozao', 'root', '1234', {
	host: 'localhost',
	dialect: 'mysql'
});
module.exports=sequelize;
