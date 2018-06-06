new Vue({
	el: "#app",
	data: {
		sort_type: "day_7",
		coinName: "",
		coinList: [],
		portfolioList: [],
		portfolioCount: 0,
		coinsList: [],
		myPortfolio: [],
		folio_index: 0,
		portfolioIndex: 0,
		portfolioTab: [
			'1ST', '2ST', '3ST'
		],
		page: {
			pageSize: 8,
			currentPage: 1,
			showItem: 6,
			totalPage: 0
		}
	},
	methods: {
		gotoCreatePortfolios() {
			if(localStorage.getItem("token")) {
				location.href = "createPortfolios.html";
			} else {
				location.href = "login.html";
			}
		},

		confirmRemove(folio_id) {
			this.$confirm('Do you want to delete this portfolio?', '', {
				confirmButtonText: 'YES',
				cancelButtonText: 'NO',
				type: 'warning',
				center: true
			}).then(() => {
				this.removeMyPortfolio(folio_id);
			}).catch(() => {

			});
		},

		removeMyPortfolio(folio_id) {
			axios.get(window.reqUrl + "/delete/portfolio/" + folio_id,{
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.getMyPortfolio();
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getCoinsList() {
			axios.get(window.reqUrl + "/get/coins/analysis")
				.then((response) => {
					if(response.data.error == 0) {
						this.coinsList = response.data.data;
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getMyPortfolio() {
			axios.get(window.reqUrl + "/get/portfolio/oneself", {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.myPortfolio = response.data.data;
						for(let j = 0; j < this.myPortfolio.length; j++) {
							this.getBasic(this.myPortfolio[j].folio_id);
						}
					}
					if(response.data.error == 403) {
						localStorage.removeItem("token");
						this.hasToken = false;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getPortfolioDetail(id) {
			if(localStorage.getItem("token")) {
				location.href = "share.html?folio_id=" + id;
			} else {
				location.href = "login.html";
			}
		},
		changePortfolio(index) {
			this.portfolioIndex = index;
		},

		getportfolioList() {
			var params = {
				offset: this.page.currentPage,
				limit: this.page.pageSize,
				sort_type: this.sort_type
			};
			axios.get(window.reqUrl + "/get/portfolio/rankinglist", {
					params: params
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.portfolioList = response.data.data.items;
						this.portfolioCount = response.data.data.count;
						this.page.totalPage = response.data.data.count;
						this.getRoi();
						this.getRoiWeek();
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getCoinDetail(id) {
			if(localStorage.getItem("token")) {
				location.href = "coinDetail.html?coin_id=" + id;
			} else {
				location.href = "login.html";
			}
		},

		getBasic(folio_id) {
			axios.get(window.reqUrl + "/get/reports/portfolio/basic/" + folio_id, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.basic = response.data.data; //response.data.data
						//google.charts.setOnLoadCallback(this.drawChart);
						google.charts.setOnLoadCallback(this.drawMonthlyChart);
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		drawMonthlyChart() {
			var varr = ['Month'];
			for(var i = 0; i < this.basic.Columns.length; i++) {
				varr.push(this.basic.Columns[i]);
			}
			varr.push({
				type: 'boolean',
				role: 'scope'
			});
			var arr = [varr];
			for(var i = 0; i < this.basic.Data.length; i++) {
				var h = [];
				var year = this.basic.Data[i][0].year;
				var month = this.basic.Data[i][0].month;
				var day = this.basic.Data[i][0].day;
				h.push(new Date(year + "-" + month + "-" + day));
				h.push(this.basic.Data[i][1][0] * 100);
				h.push(this.basic.Data[i][2]);
				arr.push(h);
			}
			var options = {
				legend: {
					'position': 'none',
				},
				chartArea: {
					"margin": "auto",

				},
				backgroundColor: "transparent",
				colors: ['#1e5adc'],
				width: 585,
				height: 400
			};
			var data = google.visualization.arrayToDataTable(arr);
			var chart = new google.visualization.LineChart(document.getElementById('monthly_chart_' + this.basic.folio_id));
			this.folio_index = this.folio_index + 1;
			chart.draw(data, options);

		},

		combinate(allocations) {
			var portfolioArr = [];
			allocations.forEach((portfolio, i) => {
				var allocationsStr = "";
				portfolio.allocations.forEach((allocation, ii) => {
					allocationsStr = allocationsStr + allocation.coin_name + " " + allocation.weight + "  ";
				})
				portfolioArr.push(allocationsStr);
			})
			return portfolioArr;
		},

		goto(index) { //跳转分页
			if(index == this.page.currentPage) return;
			this.page.currentPage = index;
			this.getportfolioList();
		},
		rateColor(rate) {
			return parseFloat(rate) >= 0 ? '#20ae16' : 'red';
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
		google.charts.load("current", {
			packages: ["corechart"]
		});
		setTimeout(this.getMyPortfolio, 1000);
		this.getportfolioList();
		this.getCoinsList();
	},
	mounted() {

	},
	computed: {
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
		combinations: function() {
			return this.combinate(this.portfolioList);
		},
		mycombinations() {
			return this.combinate(this.myPortfolio);
		},
		rois() {
			var rois = [];
			for(var i = 0; i < this.myPortfolio.length; i++) {
				var color = parseFloat(this.myPortfolio[i].hour_24_history) >= 0 ? '#20ae16' : 'red';
				rois.push(color);
			};
			return rois
		},
	},
	watch: {
		sort_type() {
			this.getportfolioList();
		}
	}
})