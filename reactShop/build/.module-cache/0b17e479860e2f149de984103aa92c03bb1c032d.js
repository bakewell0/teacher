class product extends React.Component{	
	render(props){
		return(
			React.createElement("div", {className: "goods", "data-id": "1"}, 
			React.createElement("img", {src: "http://39.108.219.59/img/productList/phone.jpg?ver=0913", style: {width:'2rem',height: '2rem'}}), 
			React.createElement("ul", null, 
			React.createElement("li", {className: "l_one"}, "Xiaomi/小米 红米手机4Y"), 
			React.createElement("li", {className: "l_two"}, "包邮", React.createElement("i", null, "上海")), 
			React.createElement("li", {className: "l_three"}, "props.message"), 
			React.createElement("li", {className: "l_four"}, "￥", React.createElement("i", null, "699"), React.createElement("strong", null, "￥899"))
			)
			)
		)
	}
}

ReactDOM.render(React.createElement("product", {message: "hello world"}),document.getElementById("app"));











