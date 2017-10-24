class product extends React.Component {
	render() {
		return(
			React.createElement("div", {className: "goods", "data-id": "1"}, 
			React.createElement("img", {src: "http://39.108.219.59/img/productList/phone.jpg?ver=0913", style: {width:'2rem',height: '2rem'}}), 
			React.createElement("ul", null, 
			React.createElement("li", {className: "l_one"}, res.Name), 
			React.createElement("li", {className: "l_two"}, "包邮", React.createElement("i", null, "上海")), 
			React.createElement("li", {className: "l_three"}), 
			React.createElement("li", {className: "l_four"}, "￥", React.createElement("i", null, "699"), React.createElement("strong", null, "￥899"))
			)
			)
		)
	}
}

axios.post('http://39.108.219.59:8080/productList')
	.then(function(response) {
		var pros = response.data.result.map(function(res) {
			return(
				React.createElement("product", {res: res})
			);
		});
		var content = (
		  React.createElement("div", {className: "content"}, 
		    pros
		  )
		);	
		ReactDOM.render(content, document.getElementById("app"));
	})
	.catch(function(error) {

	});