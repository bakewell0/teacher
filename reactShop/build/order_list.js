class header extends React.Component {
	render() {
		return(
			React.createElement("header", null, React.createElement("p", null), 
			React.createElement("span", null, "订单列表"), 
			React.createElement("div", {className: "car"}, 
			React.createElement("img", {src: "img/ddlb.png"})
			), 
			React.createElement("div", {className: "headNav", style: {display:"none"}}, 
			React.createElement("a", null, "消息"), 
			React.createElement("a", null, "首页")
			)
			)
		)
	}
}

class search extends React.Component {
	render() {
		return(
			React.createElement("div", {className: "searchback", style: {background: "none",position: "relative"}}, 
			React.createElement("div", {className: "search"}, 
			React.createElement("input", {placeholder: "搜索所有订单", className: "input", style: {marginLeft:"0px"}, onFocus:  this.searchText})
			)
			)
		)
	}
	searchText(e) {
		alert(6666);
	}
}

class orderList extends React.Component {
	render() {
		var products = this.props.order.products.map(function(product, index) {
			return(
				React.createElement(order, {product: product, key: index})
			)
		})
		return(
			React.createElement("div", {className: "goods"}, 
			React.createElement("div", {className: "order"}, 
			React.createElement("div", {className: "recharge"}, 
			React.createElement("p", null, "三际官方旗舰店", React.createElement("i", null)), 
			React.createElement("span", null, "交易成功")), 
			products
			), 
			React.createElement("div", {className: "money"}, "共", this.props.order.totalNum, "件商品 合计￥", React.createElement("i", null, this.props.order.totalCost), "(包邮)"), 
			React.createElement("div", {className: "evaluate"}, 
			React.createElement("a", null, "评价"), React.createElement("a", {onClick: this.delOrder.bind(this)}, "删除订单")
			))
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
			React.createElement("div", {className: "good"}, 
			React.createElement("img", {src: this.props.product.Image}), 
			React.createElement("p", null, this.props.product.Des), 
			React.createElement("div", {className: "cash"}, 
			React.createElement("i", null, "￥", this.props.product.CurPrice), 
			React.createElement("em", null, "￥", this.props.product.OldPrice), 
			React.createElement("strong", null, "X", React.createElement("i", null, "1"))
			)
			)
		);
	}
}

axios.post('http://39.108.219.59:8080/getOrder', { 'token': localStorage.getItem("token") })
	.then(function(result) {
		var orders = result.data.result.map(function(order, index) {
			return(React.createElement(orderList, {order: order, key: index}));
		})
		var _orderList = (
			React.createElement("div", {className: "content"}, 
		    orders
		  	)
		);
		ReactDOM.render(_orderList, document.getElementById("orderList"));
	}).catch(function() {

	})

ReactDOM.render(React.createElement(header, null), document.getElementById("head"));
ReactDOM.render(React.createElement(search, null), document.getElementById("search"));