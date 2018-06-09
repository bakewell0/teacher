var vm = new Vue({
	el: "#app",
	data: {
		coin: {},
		tabIndex: 0,
		tabs: ["Overview", "AI Forecast", "Peers Analysis", "Ratio"],
		regime: 'Model One',
		factor: 'BTC Factor',
		basic: {},
		ai: {},
		aiRegime: 'Model One',
		aiFactor: 'BTC Factor',
		nTrials: 100,
		versus: {
			PeerStats: {
				peer_stats: []
			}
		},
		pos: 0,
		peer_stats_first: [],
		peer_stats_other: [],
		peerTabName: ["Peers View", "Side-by-Side View"],
		peerTabIndex: 0,
		ratios: {},
		percentile: 0,
		url: "{coin_id}",
		opacity:1,
		loading:false
	},
	methods: {
		switchTab(index) {
			this.tabIndex = index;
		},
		rateColor(rate) {
			return parseFloat(rate) >= 0 ? '#20ae16' : 'red';
		},
		coinDetail() {
			var params = {
				offset: this.offset,
				limit: this.limit,
				sort_type: this.sort_type
			};
			axios.get(window.reqUrl + "/get/coins/detail/" + this.url, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.coin = response.data.data;
					}
					if(response.data.error == 403) {
						location.href = "login.html";
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		drawHistogram() {
			var arr = [
				['Return', 'Frequency']
			];
			for(var i = 0; i < this.basic.HistData.length; i++) {
				var h = [];
				h.push(this.basic.HistData[i][0]);
				h.push(this.basic.HistData[i][1]);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				colors: ['#1e5adc'],
				title: 'Histogram of Returns',
				hAxis: {
					"format": "0.00%",
					"title": 'Return'
				},
				vAxis: {
					title: 'Frequency'
				},
				legend: {
					"position": "none"
				}
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('histogram'));
			chart.draw(data, options);
		},

		drawMonthlyChart() {
			var varr = this.basic.Columns;
			varr.unshift('Month');
			var arr = [varr];
			for(var i = 0; i < this.basic.Data.length; i++) {
				var h = [];
				var year = this.basic.Data[i][0].year;
				var month = this.basic.Data[i][0].month;
				var day = this.basic.Data[i][0].day;
				h.push(new Date(year + "-" + month + "-" + day));
				h.push(this.basic.Data[i][1][0] * 100);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				colors: ['#1e5adc'],
				title: 'Cumulative Returns',
				hAxis: {
					"title": 'Time'
				},
				vAxis: {
					title: 'Return'
				},
			};
			var chart = new google.visualization.LineChart(document.getElementById('monthly_chart'));
			chart.draw(data, options);
		},

		drawReturns() {
			var arr = [
				['Date', this.basic.Coin.Name, 'Adjusted VaR']
			];
			for(var i = 0; i < this.basic.HistReturns.length; i++) {
				var h = [];
				var year = this.basic.HistReturns[i][0].year;
				var month = this.basic.HistReturns[i][0].month;
				var day = this.basic.HistReturns[i][0].day;
				h.push(new Date(year + "-" + month + "-" + day));
				h.push(this.basic.HistReturns[i][1]);
				h.push(this.basic.ValueAtRisk);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				title: 'Historical Returns',
				colors: ['#1e5adc', '#f39800'],
				seriesType: 'bars',
				series: {
					1: {
						type: 'line'
					}
				},
				hAxis: {
					"title": 'Time'
				},
				vAxis: {
					"format": "0.00%",
					"title": 'Daily Return'
				}
			};
			var chart = new google.visualization.ComboChart(document.getElementById('histchart'));
			chart.draw(data, options);
		},
		drawMDD() {
			var arr = [];
			if(this.basic.N_Benchmarks == 0) {
				arr = [
					['Date', this.basic.Coin.Name]
				];
				for(var i = 0; i < this.basic.UnderWater.length; i++) {
					var h = [];
					var year = this.basic.UnderWater[i][0].year;
					var month = this.basic.UnderWater[i][0].month;
					var day = this.basic.UnderWater[i][0].day;
					h.push(new Date(year + "-" + month + "-" + day));
					h.push(this.basic.UnderWater[i][1]);
					arr.push(h);
				}
			} else {
				arr = [
					['Date', 'coin', this.basic.Benchmarks[0]]
				];
				for(var i = 0; i < this.basic.UnderWater.length; i++) {
					var h = [];
					var year = this.basic.UnderWater[i][0].year;
					var month = this.basic.UnderWater[i][0].month;
					var day = this.basic.UnderWater[i][0].day;
					h.push(new Date(year + "-" + month + "-" + day));
					h.push(this.basic.UnderWater[i][1]);
					h.push(this.basic.UnderWater[i][2]);
					arr.push(h);
				}
			}

			var data = google.visualization.arrayToDataTable(arr);

			var options = {
				title: 'Underwater Curve',
				colors: ['#1e5adc'],
				hAxis: {
					"title": 'Time'
				},
				vAxis: {
					"format": "0.00%",
					"title": 'Loss'
				}
			};
			var chart = new google.visualization.LineChart(document.getElementById('underwater'));
			chart.draw(data, options);
		},

		/*ai*/
		ReturnHistogram() {
			var arr = [
				['Return', 'Frequency']
			];
			for(var i = 0; i < this.ai.ReturnHist.length; i++) {
				var h = [];
				h.push(this.ai.ReturnHist[i][0]);
				h.push(this.ai.ReturnHist[i][1]);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				title: 'Histogram of Cumulative Returns',
				hAxis: {
					"format": "0.00%",
					"title": 'Return'
				},
				vAxis: {
					"title": 'Frequency'
				},
				legend: {
					"position": "none"
				},
				width: 1130,
				height: 500,
				colors: ['#1e5adc']
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('ret_histogram'));
			chart.draw(data, options);
		},

		MDDHistogram() {
			var arr = [
				['Return', 'Frequency']
			];
			for(var i = 0; i < this.ai.MDDHist.length; i++) {
				var h = [];
				h.push(this.ai.MDDHist[i][0]);
				h.push(this.ai.MDDHist[i][1]);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				title: 'Histogram of Simulated Drawdowns',
				vAxis: {
					"title": 'Frequency'
				},
				hAxis: {
					"format": "0.00%",
					"title": 'Loss'
				},
				legend: {
					"position": "none"
				},
				width: 1130,
				height: 500,
				colors: ['#1e5adc']
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('mdd_histogram'));
			chart.draw(data, options);
		},

		drawTimeLine() {
			var container = document.getElementById('timeline');
			var chart = new google.visualization.Timeline(container);
			var dataTable = new google.visualization.DataTable();
			dataTable.addColumn({
				type: 'string',
				id: 'Regime'
			});
			dataTable.addColumn({
				type: 'date',
				id: 'Start'
			});
			dataTable.addColumn({
				type: 'date',
				id: 'End'
			});
			var arr = [];
			var pct = this.percentile;
			this.ai.Results[pct].regime_series.index.forEach((dt) => {
				var d = new Date(dt);
				d.setDate(1);
				var h = [
					this.ai.Results[pct].regime_series.value[dt] + "_" + pct,
					d,
					new Date(dt)
				];
				arr.push(h);
			})
			dataTable.addRows(arr);
			var options = {
				title: "Simulated Regimes 99th Percentile",
				colors: ['#1e5adc'],
				width: 815,
				height: 200,
				vAxis: {
					"title": 'Regime Model'
				},
				hAxis: {
					"title": 'Time'
				},
			};
			chart.draw(dataTable, options);
		},

		ReturnChart() {
			var pct = this.percentile;
			var arr = [
				['Date', 'Return']
			];
			this.ai.Results[pct].return_series.index.forEach((dt) => {
				var h = [new Date(dt), this.ai.Results[pct].return_series.value[dt]];
				arr.push(h);
			})
			var data = new google.visualization.arrayToDataTable(arr);
			var options = {
				width: 836,
				"legend": {
					"position": "none"
				},
				vAxis: {
					"title": 'Return',
					format: '0.00%'
				},
				hAxis: {
					"title": 'Time'
				},
				title: `Simulated Returns ${this.percentile}th Percentile`,
				colors: ['#1e5adc'],
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('monthreturn'));
			chart.draw(data, options);
		},

		percent() {
			google.charts.setOnLoadCallback(this.drawTimeLine);
			google.charts.setOnLoadCallback(this.ReturnChart);
		},

		/*peer*/
		distChart() {
			var arr = [];
			this.versus.PeerStats.peer_stats.forEach(function(stat) {
				var h = [
					stat.Name,
					stat.peer_stats.worst,
					stat.peer_stats.mean - stat.peer_stats.std,
					stat.peer_stats.mean + stat.peer_stats.std,
					stat.peer_stats.best
				];
				arr.push(h);
			})
			var data = google.visualization.arrayToDataTable(arr, true);
			var options = {
				legend: 'none',
				title: "Return Distribution Comparison",
				vAxis: {
					"format": "0.00%"
				},
				width: 1140,
				height: 500

			};
			var chart = new google.visualization.CandlestickChart(document.getElementById('distChartDiv'));
			chart.draw(data, options);
		},
		drawRiskReturnChart() {
			var arr = [
				['ID', 'AnnVol', 'Annualized Return', 'Max Drawdown', 'Correlation']
			];
			this.versus.PeerStats.peer_stats.forEach((stat) => {
				var h = [stat.Name, stat.peer_stats.ann_std, stat.peer_stats.ann_return, stat.peer_stats.maxdd, stat.corr];
				arr.push(h);
			})
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				title: 'Risk vs. Return',
				hAxis: {
					title: 'Annualized Volatility',
					format: '0.00%'
				},
				vAxis: {
					title: 'Annualized Return',
					format: '0.00%'
				},
				bubble: {
					textStyle: {
						fontSize: 11
					}
				},
				colorAxis: {
					colors: ['red', 'green'],
					title: 'Max DD',
					format: '0.00%'
				},
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.BubbleChart(document.getElementById('riskreturndiv'));
			chart.draw(data, options);
		},

		drawBetas(index) {
			this.betas(this.peer_stats_first[0]);
			for(var i = 0; i < this.peer_stats_other.length; i++) {
				this.betas(this.peer_stats_other[i]);
			}
		},

		betas(stat) {
			var arr = [
				['Factor', 'Beta']
			];
			for(var i = 0; i < this.versus.NFactors; i++) {
				var h = [stat.factors[i].Name, stat.peer_style.betas[i]];
				arr.push(h);
			}
			var data = new google.visualization.arrayToDataTable(arr);
			var options = {
				min: -1,
				chartArea: {
					width: '40%'
				},
				max: 1,
				hAxis: {
					format: '0.00'
				},
				legend: {
					'position': 'none'
				},
				width: 500,
				colors: ['#1e5adc'],
				title: 'Factor Sensitivies R-Sq: %'
			};
			var div = document.createElement("div");
			div.id = "style_" + stat.index;
			document.querySelector("[name=style" + stat.index + "]").appendChild(div);
			var chart = new google.visualization.ColumnChart(div);
			chart.draw(data, options);
		},

		drawRegimes(stat) {
			this.regimes(this.peer_stats_first[0]);
			for(var i = 0; i < this.peer_stats_other.length; i++) {
				this.regimes(this.peer_stats_other[i]);
			}
		},

		regimes(stat) {
			var arr = [
				['Regime', 'Avg Return']
			];
			for(var i = 0; i < stat.regime_stats.N; i++) {
				var h = [stat.regime_stats.regimes[i], stat.regime_stats.avg.iloc[i][0]];
				arr.push(h);
			}
			var data = new google.visualization.arrayToDataTable(arr);
			var options = {
				vAxis: {
					format: '0.00%'
				},
				colors: ['#1e5adc'],
				legend: {
					'position': 'none'
				},
				title: "Regime Performance",
				width: 500
			};

			var div = document.createElement("div");
			div.id = "regime_" + stat.index;
			document.querySelector("[name=regime" + stat.index + "]").appendChild(div);
			var chart = new google.visualization.ColumnChart(div);
			chart.draw(data, options);
		},

		goUp() {
			if(this.pos < 0) {
				this.pos = this.pos + 100;
				$(".slider").animate({
					"left": this.pos + "%"
				});
			}
		},

		goDown() {
			if(this.pos > (this.peer_stats_other.length - 1) * -100) {
				this.pos = this.pos - 100;
				$(".slider").animate({
					"left": this.pos + "%"
				});
			}
		},

		getBasic() {
			axios.get(window.reqUrl + "/get/reports/coins/basic/" + this.url)
				.then((response) => {
					if(response.data.error == 0) {
						this.basic = response.data.data; //response.data.data
						google.charts.setOnLoadCallback(this.drawHistogram);
						google.charts.setOnLoadCallback(this.drawMonthlyChart);
						google.charts.setOnLoadCallback(this.drawReturns);
						google.charts.setOnLoadCallback(this.drawMDD);
					} else {
						alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getAi() {
			this.loading = true;
			this.opacity = 0;
			axios.get(window.reqUrl + "/get/reports/coins/ai/" + this.url, {
					params: {
						factor_code: this.aiFactor,
						regime_name: this.aiRegime,
						n_trials: this.nTrials,
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					setTimeout(()=>{
						this.loading = false;
						this.opacity = 1;
					},1500);	
					if(response.data.error == 0) {
						this.ai = response.data.data; //response.data.data
						google.charts.setOnLoadCallback(this.ReturnHistogram);
						google.charts.setOnLoadCallback(this.MDDHistogram);
						google.charts.setOnLoadCallback(this.drawTimeLine);
						google.charts.setOnLoadCallback(this.ReturnChart);
					} else {
						alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		/*peer*/
		getVersus() {
			this.loading = true;
			this.opacity = 0;
			this.peer_stats_first = [];
			this.peer_stats_other = [];
			axios.get(window.reqUrl + "/get/reports/coins/versus/" + this.url, {
					params: {
						factor_code: this.factor,
						regime_name: this.regime,
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					setTimeout(()=>{
						this.loading = false;
						this.opacity = 1;
					},1500);	
					if(response.data.error == 0) {
						this.versus = response.data.data; //response.data.data;
						this.peer_stats_first.push(this.versus.PeerStats.peer_stats[0]);
						for(var i = 1; i < this.versus.PeerStats.peer_stats.length; i++) {
							this.peer_stats_other.push(this.versus.PeerStats.peer_stats[i]);
						}
						google.charts.load('current', {
							'packages': ['gauge', "corechart", "bar"]
						});
						google.charts.setOnLoadCallback(this.distChart);
						google.charts.setOnLoadCallback(this.drawRiskReturnChart);
						google.charts.setOnLoadCallback(this.drawBetas);
						google.charts.setOnLoadCallback(this.drawRegimes);
					} else {
						alert(response.data.message);
						if(response.data.error == 403) {
							location.href = "login.html";
						}
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getRatios() {
			axios.get(window.reqUrl + "/get/reports/coins/ratios/" + this.url)
				.then((response) => {
					if(response.data.error == 0) {
						this.ratios = response.data.data; //response.data.data
					} else {
						alert(response.data.message);
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

		peerTab(index) {
			this.peerTabIndex = index;

		}

	},

	created() {
		this.url = this.getQueryString("coin_id");
		google.charts.load("current", {
			packages: ["corechart", "controls", "bar", "timeline", "gauge"]
		});
		this.coinDetail();
		this.getBasic();
		this.getAi();
		this.getVersus();
		this.getRatios();
	},

	computed: {
		roll() {
			var roll = [];
			for(var j = 0; j < this.ratios.RollResults.length; j++) {
				var h = [];
				for(var k = 0; k < this.ratios.RollResults[j][1].length; k++) {
					h[this.ratios.RollResults[j][1][k][0]] = this.ratios.RollResults[j][1][k][1];
				}
				roll.push(h);
			}
			return roll;
		}
	},

	mounted() {

	}
})