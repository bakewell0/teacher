class product extends React.Component{	
	render(){
		return(
			React.createElement("div", {class: "goods", "data-id": "1"}, 
			React.createElement("img", {src: "http://39.108.219.59/img/productList/phone.jpg?ver=0913", style: "width:2rem;height: 2rem;"}), 
			React.createElement("ul", null, 
			React.createElement("li", {class: "l_one"}, "Xiaomi/小米 红米手机4Y"), 
			React.createElement("li", {class: "l_two"}, "包邮", React.createElement("i", null, "上海")), 
			React.createElement("li", {class: "l_three"}, "9成新"), 
			React.createElement("li", {class: "l_four"}, "￥", React.createElement("i", null, "699"), React.createElement("strong", null, "￥899"))
			)
			)
		)
	}
}

ReactDOM.render(React.createElement("product", null),document.getElementById("app"));











