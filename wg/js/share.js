var vm = new Vue({
	el: "#app",
	data: {
		tabIndex: 0,
		url: "{folio_id}",
		range: 0,
		currentRate: 0,
		piePercent: [], //比分比数组
		portfolio: {}
	},

	methods: {
		switchTab(index) {
			this.tabIndex = index;
		},
		share() {

		},
		follow() {

		},

		getPortfolio() {
			axios.get(window.reqUrl + "/get/portfolio/detail/" + this.url, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.portfolio = response.data.data;
						google.charts.setOnLoadCallback(this.pie);
					}
					if(response.data.error == 403) {
						location.href = "login.html"
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {
				return unescape(r[2]);
			}
			return null;
		},

		drawMonthlyChart() {
			var varr = this.basic.Columns;
			varr.unshift('Month');
			varr.push({type: 'boolean',role: 'scope'});
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
					"margin": "auto"
				},
				title: 'Cumulative Returns',
				colors: ['#1e5adc'],
				vAxis: {
					"title": 'Return * %'
				},
				hAxis: {
					"title": 'Time'
				},
				width: 585,
				height: 250
			};
			var data = google.visualization.arrayToDataTable(arr);
			var chart = new google.visualization.LineChart(document.getElementById('monthly_chart'));
			chart.draw(data, options);
		},
		
		pie(){
			var arr = [
				['portfolio', '5']
			];
		    this.portfolio.allocations.forEach((allocation)=>{		    	
		    	var h = [allocation.coin_name, parseFloat(allocation.weight)];
				arr.push(h);
		    })
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				slices: {
					4: {
						offset: 0.2
					},
					12: {
						offset: 0.3
					},
					14: {
						offset: 0.4
					},
					15: {
						offset: 0.5
					},
				},
				height: 250
			};
			var chart = new google.visualization.PieChart(document.getElementById('pie'));
			chart.draw(data, options);
		},
		
		getBasic() {
			axios.get(window.reqUrl + "/get/reports/portfolio/basic/" + this.url, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.basic = response.data.data; //response.data.data
						google.charts.setOnLoadCallback(this.drawMonthlyChart);
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},

	created() {
		google.charts.load("current", {
			packages: ["corechart", "controls", "bar", "timeline", "gauge"]
		});
		this.url = this.getQueryString("folio_id");
		this.getPortfolio();
		this.getBasic();
	}
})