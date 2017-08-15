function Shop(){
    this.exec = function(route, req, res){
    var prefix="http://192.168.0.106:8020/node/"
	var json= {
          roundList:[
          {
          	imageUrl:prefix+'img/shop/tb1.png',
          	roundBg:'#ffb20c',
          	des:'中西药'
          },
          {
          	imageUrl:prefix+'img/shop/tb2.png',
          	roundBg:'#ff4400',
          	des:'儿童用药'
          },
          {
          	imageUrl:prefix+'img/shop/tb3.png',
          	roundBg:'#22a6f9',
          	des:'医疗用药'
          },
          {
          	imageUrl:prefix+'img/shop/tb4.png',
          	roundBg:'#e45734',
          	des:'医疗器械'
          },
          {
          	imageUrl:prefix+'img/shop/tb5.png',
          	roundBg:'#e2000c',
          	des:'养生保健'
          },
          {
          	imageUrl:prefix+'img/shop/tb6.png',
          	roundBg:'#ff7e00',
          	des:'隐形眼镜'
          },
          {
          	imageUrl:prefix+'img/shop/tb7.png',
          	roundBg:'#ff4d49',
          	des:'美容护肤'
          },
          {
          	imageUrl:prefix+'img/shop/tb8.png',
          	roundBg:'#eb3c78',
          	des:'成人用品'
          }
          ],
          cheapest:{
            title:'全网最低价',
            products:[
            {
          	productName:'【力魂】灵芝益寿胶囊',
          	price:'8.99',
          	productImage:prefix+'img/shop/s.png'
            },
            {
          	productName:'【永安康健】玛咖',
          	price:'119.00',
          	productImage:prefix+'img/shop/s1.png'
            },        
            {
          	productName:'【金奥力】蜂胶胶囊',
          	price:'138.00',
          	productImage:prefix+'img/shop/s2.png'
            }      
            ]
          },
          thanks:{
          	title:'答谢恩师',
            products:[
            {
          	productName:'鸿茅药酒（500ml）',
          	price:'196.00',
          	productImage:prefix+'img/shop/s5.png'
            },
            {
          	productName:'【恒诚】跌打榜药酒',
          	price:'13.80',
          	productImage:prefix+'img/shop/s3.png'
            },        
            {
          	productName:'【万通】颈痛灵药酒',
          	price:'25.00',
          	productImage:prefix+'img/shop/s4.png'
            }      
            ]
          },
          beautiful:{
          	title:'美美哒',
            products:[
            {
          	productName:'【姿美堂】胶原蛋白粉',
          	price:'8.99',
          	productImage:prefix+'img/shop/s6.png'
            },
            {
          	productName:'新加坡DRC亮白蚕丝精华液',
          	price:'15.80',
          	productImage:prefix+'img/shop/s7.png'
            },        
            {
          	productName:'【爱美得】大眼睛睫毛膏',
          	price:'36.00',
          	productImage:prefix+'img/shop/s8.png'
            }      
            ]
          } 
        }     
	res.setHeader('Access-Control-Allow-Origin','*');     
    res.send(json);
    }
}
module.exports=new Shop();


