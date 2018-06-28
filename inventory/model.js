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
	code:Sequelize.STRING,//仓库代码
	name:Sequelize.STRING,//仓库名称
	addr:Sequelize.STRING,//仓库地址
	area:Sequelize.STRING,//仓库面积
	note:Sequelize.STRING//备注
});	

/*职员*/
var staff=sequelize.define('staff', {
	name:Sequelize.STRING,//名称
	telephone:Sequelize.STRING,//电话
	duty:Sequelize.STRING,//岗位
	idcard:Sequelize.STRING,//身份证
	gender:Sequelize.STRING,//性别
	family:Sequelize.STRING,//家庭情况
	employDate:Sequelize.STRING,//入职时间
	fullDate:Sequelize.STRING//转正时间
});	

/*商品*/
var goods= sequelize.define('goods', {
	name:Sequelize.STRING,
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
	feedback:Sequelize.STRING,//跟踪反馈
	price:Sequelize.STRING,//价格
	note:Sequelize.STRING,//备注
});	

/*采购，进货管理*/
var purchase=sequelize.define('purchase', {
	supplierid:Sequelize.STRING,//供应商
	handleman:Sequelize.STRING,//经办人
	handledate:Sequelize.STRING,//经办日期
	paymenttype:Sequelize.STRING,//付款方式,0现金，1网银
	invoicetype:Sequelize.STRING,//发票类型
	invoiceno:Sequelize.STRING,//发票号
	goodsid:Sequelize.STRING//商品id
});	

/*销售*/

var models={
		user:user,
		supplier:supplier,
		customer:customer,
		wharehouse:wharehouse,
		staff:staff,
		goods:goods,
		afterSale:afterSale,
		purchase:purchase
}

module.exports=models;
