var Sequelize=require("sequelize");
var sequelize=require("./connect.js");
//个人中心接口
var user = sequelize.define('user', {
		phone:Sequelize.STRING,
		email:Sequelize.STRING,
		password:Sequelize.STRING,
		headImage:Sequelize.STRING,
	    	name:Sequelize.STRING,
	    	gender:Sequelize.STRING,
	    	address:Sequelize.STRING
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
  		Des:Sequelize.STRING,
  		ShopName:Sequelize.STRING,
  		BrowseTimes:Sequelize.INTEGER,
  		isDelete: Sequelize.INTEGER
});
//购物车
var shopCar = sequelize.define('shopCar', {
    		ProductId: Sequelize.INTEGER,
  		UserId:Sequelize.STRING,
  		ProductNumber:Sequelize.STRING,
});
//个人中心
var person = sequelize.define('person', {
		HeadImage:Sequelize.STRING,
    	Name:Sequelize.STRING
});

//订单
var order = sequelize.define('order', {
	userId: Sequelize.INTEGER,
	totalCost: Sequelize.STRING,
	totalNum: Sequelize.STRING,
	isInvoice: Sequelize.STRING,
	message: Sequelize.STRING,
	state: Sequelize.STRING,
	productId: Sequelize.STRING,
	productNum: Sequelize.STRING
});

//评论
var comments = sequelize.define('comment', {
		orderId:Sequelize.INTEGER,
		userId:Sequelize.INTEGER,
		content:Sequelize.STRING,
		describeScore:Sequelize.STRING,
		logisticsScore:Sequelize.STRING,
		serviceScore:Sequelize.STRING
});

//浏览记录
var browselog = sequelize.define('browselog', {
	userId: Sequelize.INTEGER,
	productId: Sequelize.INTEGER
});

//浏览记录
var collectionlog = sequelize.define('collectionlog', {
	userId: Sequelize.INTEGER,
	productId: Sequelize.INTEGER
});

var models={
		user:user,
		product:product,
		shopCar:shopCar,
		person:person,
		order:order,
		comments:comments,
		browselog:browselog,
		collectionlog:collectionlog
}

module.exports=models;
