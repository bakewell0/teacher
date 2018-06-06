var vm=new Vue({
	el: "#app",
	data: {
		portfolioList: [],
		sort_type: "day_7",
		page: {
			pageSize:8,
			currentPage:1,
			showItem:6,
			totalPage:0
		}
	},
	methods: {
		getportfolioList() {
			var params = {
				offset: this.page.currentPage,
				limit: this.page.pageSize,
				sort_type: this.sort_type
			};
			axios.get(window.reqUrl + "/get/portfolio/rankinglist", {params: params})
				.then((response) => {
					if(response.data.error == 0) {
						this.portfolioList = response.data.data.items;
						this.page.totalPage = response.data.data.count;
						this.getRoi();
						this.getRoiWeek();
					} else {
						alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getPortfolioDetail(id) {
			if(localStorage.getItem("token")){
				location.href="share.html?folio_id="+id;
			}
			else{
				location.href="login.html";
			}			
		},
		goto(index) { //跳转分页
			if(index == this.page.currentPage) return;
			this.page.currentPage = index;
			this.getportfolioList();
		},
		getRoi() {
			this.portfolioList.forEach((portfolio) => {
				portfolio.roi = portfolio.entire_history;
			})
		},
		getRoiWeek() {
			this.portfolioList.forEach((portfolio) => {
				portfolio.roiWeek = portfolio.day_7_history;
			})
		}
	},
	created() {
		this.getportfolioList();
	},
	computed:{
		roi() {
			var colors = [];
			for(var i = 0; i < this.portfolioList.length; i++) {
				var color = parseFloat(this.portfolioList[i].roi) >= 0 ? '#20ae16' : 'red';
				colors.push(color);
			};
			return colors;
		},
		roiWeek() {
			var colors = [];
			for(var i = 0; i < this.portfolioList.length; i++) {
				var color = parseFloat(this.portfolioList[i].roiWeek) >= 0 ? '#20ae16' : 'red';
				colors.push(color);
			};
			return colors;
		},
		max_drawdown() {
			var colors = [];
			for(var i = 0; i < this.portfolioList.length; i++) {
				var color = parseFloat(this.portfolioList[i].max_drawdown) >= 0 ? '#20ae16' : 'red';
				colors.push(color);
			};
			return colors;
		},
		combinations:function(){
			var portfolioArr=[];
			this.portfolioList.forEach((portfolio,i)=>{
				var allocationsStr = "";
				portfolio.allocations.forEach((allocation,ii)=>{
					allocationsStr = allocationsStr +allocation.coin_name+" "+allocation.weight+"  ";
				})
				portfolioArr.push(allocationsStr);
			})		
			return portfolioArr;
		}
	},
	watch:{
		sort_type(){
			this.getportfolioList();
		}
	}
})