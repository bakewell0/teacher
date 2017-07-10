var ajax = function(){
	var xhr=new XMLHttpRequest;
	xhr.open(	
		"post",		
		"http://192.168.2.104:3900/index"		
	);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.status==200&&xhr.readyState==4){
			var res=JSON.parse(xhr.response);
			setAddress(res);
			setProduct(res);	
			setTheme(res);
			setYoulikes(res);
		}
	}	
}

ajax();

var setAddress = function(res){
	document.querySelector(".port").innerHTML=res.address;
	document.querySelector(".city").innerHTML=res.address;	
}

var setProduct = function(res){
	for(var i=0;i<res.products.length;i++){	     
        var li='<li class="icon">'
              +'<a style="background:'+ res.products[i].background +'"></a>'
              +'<p>'+ res.products[i].Text +'</p></li>'
        document.querySelector(".main ul").appendChild(parseDom(li));       
	}	
}

var setTheme = function(res){
	for(var i=0;i<res.themes.length;i++){
		var infoBlock='<div class="infoBlock">'
		               +'<p class="info">'+res.themes[i].info+'</p>'
				       +'<p class="infoDetail">'+res.themes[i].infoDetail+'</p>'
				       +'<p><img src="'+res.themes[i].imageUrl+'" alt=""></p>'				
			           +'</div>';			
		document.querySelector(".theme").appendChild(parseDom(infoBlock));	
	}
}

var setYoulikes = function(res){
	for(var i=0;i<res.youLikes.length;i++){
		var li='<li>'
				+'<img src="'+res.youLikes[i].ImageUrl+'" alt="">'
				+'<div class="productDes">'
					+'<p class="productName">'+res.youLikes[i].Name+'</p>'
					+'<p class="productPort">'+res.youLikes[i].Port+'</p>'
					+'<p class="MainPrice">'
						+'<i></i><span class="unit">元</span>'
						+'<span class="secondPrice">门市价:'+res.youLikes[i].BeforePrice+'元</span>'
						+'<span class="hasSold">已售'+res.youLikes[i].HasSold+'</span>'
					+'</p>'
				+'</div>'					
		    +'</li>';
		document.querySelector(".productList ul").appendChild(parseDom(li));	
	}
}

 function parseDom(arg) {
　　 var obj = document.createElement("div");
　　 obj.innerHTML = arg;
　　 return obj.childNodes[0];
};













