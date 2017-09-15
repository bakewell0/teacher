var Sequelize=require("sequelize");
var sequelize = new Sequelize('tiaozao', 'root', '1234', {
	host: '39.108.219.59',
	dialect: 'mysql'
});
module.exports=sequelize;
