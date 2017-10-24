class product extends React.Component {
	render() {
		return(
			React.createElement("div", {className: "goods", "data-id": this.props.res.id, onClick: this.handleClick}, 
			React.createElement("img", {src: this.props.res.Image, style: {width:'2rem',height: '2rem'}}), 
			React.createElement("ul", null, 
			React.createElement("li", {className: "l_one"}, this.props.res.Name), 
			React.createElement("li", {className: "l_two"}, this.props.res.Carriage, React.createElement("i", null, this.props.res.Destination)), 
			React.createElement("li", {className: "l_three"}, this.props.res.Status), 
			React.createElement("li", {className: "l_four"}, "￥", React.createElement("i", null, this.props.res.CurPrice), React.createElement("strong", null, "￥", this.props.res.OldPrice))
			)
			)
		)
	}	
	 handleClick() {
    	alert(555);
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