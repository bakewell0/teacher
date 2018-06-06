var vm=new Vue({
	el: "#app",
	data: {
		searchFilter: "",
		coinsList: [],
		page: {
			pageSize: 8,
			currentPage: 1,
			showItem: 6,
			totalPage: 0
		}
	},
	methods: {
		getCoinsList() {
			axios.get(window.reqUrl + "/get/coins/list", {
					params: {
						offset: this.page.currentPage,
						limit: this.page.pageSize,
						name: this.searchFilter
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.coinsList = response.data.data.items;
						this.page.totalPage = response.data.data.count;
					} else {
						alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getCoinDetail(id) {
			if(localStorage.getItem("token")){
				location.href="coinDetail.html?coin_id="+id;
			}
			else{
				location.href="login.html";
			}			
		},
		goto(index) { //跳转分页
			if(index == this.page.currentPage) return;
			this.page.currentPage = index;
			this.getCoinsList();
		},
		getColors(arr){
			var colors=[];
    		for(var i=0;i<arr.length;i++){
    			var color=parseFloat(arr[i].hour_24_history)>=0?'#20ae16':'red';
    			colors.push(color);
    		};
    		return colors;
		}
	},
	created() {
		this.getCoinsList();
	},
	computed:{
		hours_1_index(){
			var colors=[];
    		for(var i=0;i<this.coinsList.length;i++){
    			var color=parseFloat(this.coinsList[i].hours_1_index)>=0?'#20ae16':'red';
    			colors.push(color);
    		};
    		return colors;
		},
		hours_24_index(){
			var colors=[];
    		for(var i=0;i<this.coinsList.length;i++){
    			var color=parseFloat(this.coinsList[i].hours_24_index)>=0?'#20ae16':'red';
    			colors.push(color);
    		};
    		return colors;
		},
		day_7_index(){
			var colors=[];
    		for(var i=0;i<this.coinsList.length;i++){
    			var color=parseFloat(this.coinsList[i].day_7_index)>=0?'#20ae16':'red';
    			colors.push(color);
    		};
    		return colors;
		}
	}
})