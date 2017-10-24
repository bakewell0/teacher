class header extends React.Component {
	render() {
		return(
			<header><p></p> 
			<span>订单列表</span> 
			<div className="car">
			<img src="img/ddlb.png" />
			</div>
			<div className="headNav" style={{display:"none"}}>
			<a>消息</a>
			<a>首页</a>
			</div>
			</header>
		)
	}
}

class search extends React.Component {
	render() {
		return(
			<div className="searchback" style={{background: "none",position: "relative"}}>
			<div className="search">
			<input placeholder="搜索所有订单" className="input" style={{marginLeft:"0px"}} />
			</div>
			</div>
		)
	}
}

class orderList extends React.Component {
	render() {
		var products = this.props.order.products.map(function(product) {
			return(
				<order product={product}/>
			)
		})
		return(
			<div className="goods">
			<div className="order">
			<div className="recharge">
			<p>三际官方旗舰店<i></i></p>
			<span>交易成功</span></div>
			{products}
			</div>
			<div className="money">共{this.props.order.totalNum}件商品 合计￥<i>{this.props.order.totalCost}</i>(包邮)</div>
			<div className="evaluate">
			<a>评价</a><a onClick={this.delOrder.bind(this)}>删除订单</a>
			</div></div>
		)
	}
	delOrder() {
		axios.post('http://39.108.219.59:8080/delOrder', { 'token': localStorage.getItem("token"), orderId: this.props.order.id }).then(function(result) {
			location.reload();
		}).catch(function() {

		})
	}
}

class order extends React.Component {
	render() {
		return(
			<div className="good">
			<img src={this.props.product.Image} />
			<p>{this.props.product.Des}</p>
			<div className="cash">
			<i>￥{this.props.product.CurPrice}</i>
			<em>￥{this.props.product.OldPrice}</em>
			<strong>X<i>1</i></strong>
			</div>
			</div>
		);
	}
}

axios.post('http://39.108.219.59:8080/getOrder', { 'token': localStorage.getItem("token") })
	.then(function(result) {
		var orders = result.data.result.map(function(order) {
			return(<orderList order={order}/>);
		})
		var _orderList = (
			<div className="content">
			<search/>
		    {orders}
		  	</div>
		);
		ReactDOM.render(_orderList, document.getElementById("orderList"));
	}).catch(function() {

	})

ReactDOM.render(<header/>, document.getElementById("head"));