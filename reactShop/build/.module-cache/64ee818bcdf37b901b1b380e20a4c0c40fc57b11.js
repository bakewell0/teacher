class product extends React.Component{	
	render(){
		return(
			React.createElement("div", {className: "goods", "data-id": "1"}, 
			React.createElement("img", {src: "http://39.108.219.59/img/productList/phone.jpg?ver=0913", style: {width:'2rem',height: '2rem'}}), 
			React.createElement("ul", null, 
			React.createElement("li", {className: "l_one"}, "Xiaomi/小米 红米手机4Y"), 
			React.createElement("li", {className: "l_two"}, "包邮", React.createElement("i", null, "上海")), 
			React.createElement("li", {className: "l_three"}, this.props.name), 
			React.createElement("li", {className: "l_four"}, "￥", React.createElement("i", null, "699"), React.createElement("strong", null, "￥899"))
			)
			)
		)
	}
}


axios.post('http://39.108.219.59:8080/productList')
	.then(function(response) {
		var pros="";		
		for(var i=0,len=response.data.result.length;i<len;i++){
			pros=React.createElement("product", {name: "hello"});
		}	
		console.log(pros);
		ReactDOM.render(pros,document.getElementById("app"));
	})
	.catch(function(error) {

	});

















