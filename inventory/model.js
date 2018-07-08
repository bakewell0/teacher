var Sequelize=require("sequelize");
var sequelize=require("./connect.js");
//用户
var user = sequelize.define('user', {
	name:Sequelize.STRING,
	password:Sequelize.STRING
});	

/*供应商*/
var supplier=sequelize.define('supplier', {
	name:Sequelize.STRING,//名称
	category:Sequelize.STRING,//类别
	linkman:Sequelize.STRING,//联系人
	telephone:Sequelize.STRING,//电话
	account:Sequelize.STRING,//开户行，账号
	taxNum:Sequelize.STRING,//税号
	regAddr:Sequelize.STRING,//注册地址
	property:Sequelize.STRING//属性
});	

/*客户*/
var customer=sequelize.define('customer', {
	name:Sequelize.STRING,//名称
	category:Sequelize.STRING,//类别
	linkman:Sequelize.STRING,//联系人
	telephone:Sequelize.STRING,//电话
	taxNum:Sequelize.STRING,//税号
	property:Sequelize.STRING//属性
});	

/*仓库*/
var wharehouse=sequelize.define('wharehouse', {
	name:Sequelize.STRING,//仓库名称
	addr:Sequelize.STRING,//仓库地址
	note:Sequelize.STRING//备注
});	

/*职员*/
var staff=sequelize.define('staff', {
	name:Sequelize.STRING,//名称
	telephone:Sequelize.STRING,//电话
	duty:Sequelize.STRING,//岗位
	idcard:Sequelize.STRING,//身份证
	gender:Sequelize.STRING,//性别
	employDate:Sequelize.STRING,//入职时间
	fullDate:Sequelize.STRING,//转正时间，
	familyphone:Sequelize.STRING,//家庭电话
	familyaddr:Sequelize.STRING,//家庭住址
});	

/*商品*/
var goods= sequelize.define('goods', {
	name:Sequelize.STRING,//名称
	category:Sequelize.STRING,//类别
	brand:Sequelize.STRING,//品牌
	model:Sequelize.STRING,//型号
	specific:Sequelize.STRING,//规格
	supplier:Sequelize.STRING //供应商名称
});	

/*售后*/
var afterSale=sequelize.define('afterSale', {
	customerid:Sequelize.STRING,//客户
	breakdown:Sequelize.STRING,//故障
	iswarranty:Sequelize.STRING,//保修期内0，保修期外1
	ischarge:Sequelize.STRING,//收费0，免费1
	aftercontent:Sequelize.STRING,//售后内容
	price:Sequelize.STRING//价格
});	

/*采购，进货管理*/
var purchase=sequelize.define('purchase', {
	proid:Sequelize.STRING,//项目id,
	custid:Sequelize.STRING//客户id
});	

/*项目管理*/
var promanage=sequelize.define('promanage', {
	proname:Sequelize.STRING,//项目名称
	custname:Sequelize.STRING,//客户名称
});	

/*货物清单表*/
var manifest=sequelize.define('manifest', {
	name:Sequelize.STRING,//名称
	quantity:Sequelize.STRING,//数量
	buyprice:Sequelize.STRING,//进价
	sellprice:Sequelize.STRING,//售价
	supplier:Sequelize.STRING,//供应商
	isget:Sequelize.STRING,//到货情况
	proname:Sequelize.STRING,//项目名称
	custname:Sequelize.STRING//客户名称
});	

var models={
		user:user,
		supplier:supplier,
		customer:customer,
		wharehouse:wharehouse,
		staff:staff,
		goods:goods,
		afterSale:afterSale,
		purchase:purchase,
		promanage:promanage,
		manifest:manifest
}

module.exports=models;
