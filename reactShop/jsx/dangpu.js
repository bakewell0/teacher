class product extends React.Component {
	render() {
		return(
			<div className="goods" data-id={this.props.res.id} onClick={this.handleClick.bind(this)}>
			<img src={this.props.res.Image} style={{width:'2rem',height: '2rem'}} />
			<ul>
			<li className="l_one">{this.props.res.Name}</li>
			<li className="l_two">{this.props.res.Carriage}<i>{this.props.res.Destination}</i></li>
			<li className="l_three">{this.props.res.Status}</li>
			<li className="l_four">￥<i>{this.props.res.CurPrice}</i><strong>￥{this.props.res.OldPrice}</strong></li>
			</ul>
			</div>
		)
	}
	handleClick() {
		location.href = "xiangqing.html?id=" + this.props.res.id;
	}
}

axios.post('http://39.108.219.59:8080/productList')
	.then(function(response) {
		var pros = response.data.result.map(function(res) {
			return(
				<product res={res}/>
			);
		});
		var content = (
			<div className="content">
		    {pros}
		  </div>
		);
		ReactDOM.render(content, document.getElementById("app"));
	})
	.catch(function(error) {

	});