var Sequelize=require("sequelize");
var sequelize = new Sequelize('tiaozao', 'root', '292211', {
	host: 'localhost',
	dialect: 'mysql'
});
module.exports=sequelize;
