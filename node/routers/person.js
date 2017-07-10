function Person(){
	  this.exec = function(route, req, res){
	 	var json={
          NavTitle:"个人中心",
		  Account:{
		    Person:{
		       Image:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2090964548,2326618055&fm=26&gp=0.jpg',
		       Name:'菜鸟基地',
		       Money:'100000000'
		    }
		  },
		  Collection:[
		  {
		  	OrderDes:'我的收藏'
		  },
		  {		  	
		  	OrderDes:'我的抵用券'
		  },
		  {		  	
		  	OrderDes:'我的抽奖单'
		  },
		  {		  	
		  	OrderDes:'积分换礼品'
		  }
		  ],
		  Address:'长沙'
        }     
		res.setHeader('Access-Control-Allow-Origin','*');     
	    res.send(json);
	  }
}
module.exports=new Person();
