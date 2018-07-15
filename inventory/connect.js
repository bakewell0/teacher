var Sequelize=require("sequelize");
var sequelize = new Sequelize('inventory', 'root', 'Zjb1234.', {
	host: '47.99.44.43',
	dialect: 'mysql'
});
module.exports=sequelize;
