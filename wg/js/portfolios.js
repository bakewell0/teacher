var vm = new Vue({
	el: "#app",
	data: {
		tabIndex: 0,
		url: "{folio_id}",
		range: 0,
		portfolio: {},
		analysisTab: [{
				name: "Portfolio Optimization"
			},
			{
				name: "Basic Chart"
			},
			{
				name: "AI Forecast"
			},
			{
				name: "Style Analysis"
			},
			/*{
				name: "BenchmarkAnalysis"
			},*/
			{
				name: "Ratios"
			},
			{
				name: "Risk/Return Attribution"
			}
		],
		optimization: {},
		risk_fun:'var',
		basic: {},
		ai: {},
		style: {},
		benchmark: {},
		ratios: {},
		risk: {},
		//factorModel: 'bitcoin',
		aiRegime: 'Model One',
		aiFactor: 'BTC Factor',
		nTrials: 100,
		styleFactor: 'BTC Factor',
		percentile: 0,
		opacity:1,
		loading:false,
		frontier:null
	},

	methods: {
		switchTab(index) {
			this.tabIndex = index;
		},
		share() {

		},
		follow() {

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
						location.href="index.html";
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
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

		drawChart() {
			var arr = [
				['litecoin', '5']
			];
			for(var j = 0; j < this.optimization.K; j++) {
				var h = [this.optimization.Coins[j].Name, this.optimization.Frontier[this.range][0][j]];
				arr.push(h);
			}
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
				height: 300
			};

			var chart = new google.visualization.PieChart(document.getElementById('piechart'));
			chart.draw(data, options);
		},

		frontierAllocs() {
			var arr = [];
			var titles = ["Portfolio"];
			for(var i = 0; i < this.optimization.K; i++) {
				titles.push(this.optimization.Coins[i].Name);
			}
			arr.push(titles);
			for(var i = 0; i < this.optimization.N; i++) {
				var content = [];
				content.push(i);
				for(var j = 0; j < this.optimization.K; j++) {
					content.push(this.optimization.Frontier[i][0][j]);
				}
				arr.push(content);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				title: 'Frontier Allocations',
				chartArea: {
					left: "10%",
					right: "5%",
					top: "10%",
					bottom: "10%",
					width: "100%"
				},
				legend: {
					'position': 'bottom'
				},
				vAxis: {
					format: '0.00%',
					title:'weight'
					
				},
				height: 450,
				isStacked: 'relative',
				width: 1140
			};
			var chart = new google.visualization.AreaChart(document.getElementById('frontier_alloc_chart'));
			chart.draw(data, options);
		},

		frontier_chart() {
			var arr = [
				['Risk ' + this.optimization.Fun, 'Return', {
					'type': 'string',
					'role': 'style'
				}]
			];
			for(var i = 0; i < this.optimization.N; i++) {
				var Frontier = this.optimization.Frontier;
				var AnnFactor = this.optimization.AnnFactor;
				var h = [];
				if(this.optimization.Fun == 'var') {
					h = [Frontier[i][2] * (AnnFactor ** 0.5), Frontier[i][1] * AnnFactor];
				} else {
					h = [Frontier[i][2], Frontier[i][1] * AnnFactor];
				}
				if(i == this.optimization.MaxSharpeIDx) {
					h.push('point { size: 10; shape-type: star; fill-color: #f39800; }');
				} else if(this.optimization.N - 1) {
					h.push('point { size: 5; shape-type: diamond; fill-color: #1e5adc; }');
				} else {
					h.push('point { size: 5; shape-type: circle; fill-color: #1e5adc; }');
				}
				arr.push(h);
			}
			var data = new google.visualization.arrayToDataTable(arr);
			var options = {
				title: 'Efficient Frontier',
				legend: {
					'position': 'none'
				},
				vAxis: {
					format: '0%',
					title:'Annualized Return',
					textPosition:'in'
				},
				hAxis: {
					format: '0%',
					title:'Annualized Risk'
				},
				chartArea: {
					left: "10%",
					right: "5%",
					top: "10%",
					bottom: "10%",
					width: "100%"
				},
				crosshair: {
					trigger: 'both'
				},
				height: 450,
				width: 1140
			};

			var chart = new google.visualization.ScatterChart(document.getElementById('frontier_chart'));
			google.visualization.events.addListener(chart, 'select', selectHandler);
			chart.draw(data, options);
			var self = this;
			function selectHandler(e) {
				var selectedItem = chart.getSelection()[0];
				if(selectedItem) {
					self.range = selectedItem.row;
				}
			}
			chart.draw(data, options);
			this.frontier = chart;
		},

		RegressionCharts() {
			var arr=[['Factor', 'Beta']];
			for(var j=0;j<this.optimization.F;j++){
				var h=[this.optimization.Factors[j].Name,this.optimization.Regressions[this.range].betas[j]];
				arr.push(h);
			}
		    var data = new google.visualization.arrayToDataTable(arr);
		    var options = {
		        min:-1,
		        max:1,
		        vAxis:{format:'0.00', scaleType:'log', textStyle:{fontSize:10}},
		        chartArea: {left: "35%", width:"100%"},
		        legend:{'position':'none'},
		        colors: ['#C28708','#512403', '#262602', '#BA5004', '#465726','#EBD006','#CA9F5D','#996C1A'],
		        title:"Factor Exposures",
		        height:270,
		        width:550,
		        colors: ['#1e5adc']
		    };
		    var chart = new google.visualization.BarChart(document.getElementById('betas'));
		    chart.draw(data, options);
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
			var options = {
				legend: {
					'position': 'none',
				},
				chartArea: {
					"margin": "auto"
				},
				vAxis: {
					"title": 'Frequency'
				},
				hAxis: {
					"format": "0.00%",
					"title": 'Return'
				},
				colors: ['#1e5adc'],
				width: 1130,
				height: 500
			};
			var data = google.visualization.arrayToDataTable(arr);
			var chart = new google.visualization.ColumnChart(document.getElementById('histogram'));
			chart.draw(data, options);
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
				height: 250
			};
			var data = google.visualization.arrayToDataTable(arr);
			var chart = new google.visualization.LineChart(document.getElementById('monthly_chart'));
			chart.draw(data, options);
		},

		drawReturns() {
			var arr = [
				['Date', this.basic.Coin.Name, {type: 'boolean',role: 'scope'}, 'Adjusted VaR']
			];
			for(var i = 0; i < this.basic.HistReturns.length; i++) {
				var h = [];
				var year = this.basic.HistReturns[i][0].year;
				var month = this.basic.HistReturns[i][0].month;
				var day = this.basic.HistReturns[i][0].day;
				h.push(new Date(year + "-" + month + "-" + day));
				h.push(this.basic.HistReturns[i][1]);
				h.push(this.basic.HistReturns[i][2]);
				h.push(this.basic.ValueAtRisk);
				arr.push(h);
			}
			var options = {
				/*legend: {
					'position': 'none',
				},*/
				chartArea: {
					"margin": "auto"
				},
				vAxis: {
					"format": "0.00%",
					"title": 'Gain'
				},
				hAxis: {
					"title": 'Time'
				},
				title: 'Historical Returns',
				colors: ['#1e5adc', '#f39800'],
				width: 1130,
				height: 500
			};
			var data = google.visualization.arrayToDataTable(arr);
			var chart = new google.visualization.ComboChart(document.getElementById('histchart'));
			chart.draw(data, options);
		},

		drawMDD() {
			var arr = [];
			if(this.basic.N_Benchmarks == 0) {
				arr = [
					['Date', this.basic.Coin.Name, {type: 'boolean',role: 'scope'}]
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
			} else {
				arr = [
					['Date', 'coin', this.basic.Benchmarks[0],{type: 'boolean',role: 'scope'}]
				];
				for(var i = 0; i < this.basic.UnderWater.length; i++) {
					var h = [];
					var year = this.basic.UnderWater[i][0].year;
					var month = this.basic.UnderWater[i][0].month;
					var day = this.basic.UnderWater[i][0].day;
					h.push(new Date(year + "-" + month + "-" + day));
					h.push(this.basic.UnderWater[i][1]);
					h.push(this.basic.UnderWater[i][2]);
					h.push(this.basic.UnderWater[i][3]);
					arr.push(h);
				}
			}
			var options = {
				legend: {
					'position': 'none',
				},
				chartArea: {
					"margin": "auto"
				},
				vAxis: {
					"format": "0.00%",
					"title": 'Loss'
				},
				hAxis: {
					"title": 'Time'
				},
				title: 'Underwater Curve',
				colors: ['#1e5adc'],
				width: 1130,
				height: 500
			};
			var data = google.visualization.arrayToDataTable(arr);
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
				vAxis: {
					"title": 'Frequency'
				},
				hAxis: {
					"format": "0.00%",
					"title": 'Return'
				},
				legend: {
					"position": "none"
				},
				colors: ['#1e5adc'],
				width: 1130,
				height: 500,
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
				vAxis: {
					"title": 'Regime Model'
				},
				hAxis: {
					"title": 'Time'
				},
				title: "Simulated Regimes 99th Percentile",
				colors: ['#1e5adc'],
				width: 815,
				height: 200
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
					format: '0.00',
					"title": 'Return'
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

		/*style*/
		Betas() {
			var arr = [];
			arr = [
				['Factor', 'Beta']
			];
			for(var i = 0; i < this.style.Results.N - 1; i++) {
				var h = [];
				h.push(this.style.Results.factor_names[i]);
				h.push(this.style.Results.reg_analysis.betas[i]);
				arr.push(h);
			}
			var data = new google.visualization.arrayToDataTable(arr);
			var view = new google.visualization.DataView(data);
			view.setColumns([0, 1]);
			var options = {
				min: -1,
				chartArea: {
					width: '50%'
				},
				max: 1,
				vAxis: {
					"title": "Factor Model"
				},
				hAxis: {
					"title": 'Beta'
				},
				legend: {
					'position': 'none'
				},
				colors: ['#1e5adc'],
				title: "Factor Exposures",
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.BarChart(document.getElementById('betas_div'));
			chart.draw(view, options);
		},

		RSQGauge() {
			var square = this.style.Results.reg_analysis.rsq * 100;
			var data = google.visualization.arrayToDataTable([
				['Label', 'Value'],
				['R-Square', square]
			]);
			var options = {
				width: 400,
				height: 200,
				redFrom: 75,
				redTo: 100,
				greenFrom: 0,
				greenTo: 50,
				yellowFrom: 50,
				yellowTo: 75,
				majorTicks: 10,
				min: 0,
				max: 100,
			};
			var chart = new google.visualization.Gauge(document.getElementById('rsq_div'));
			chart.draw(data, options);
		},

		RollingBetas() {
			var arr = [];
			var T = ["Date"];
			for(var i = 0; i < this.style.Results.N - 1; i++) {
				T.push(this.style.Results.factor_names[i]);
			}
			T.push({type: 'boolean',role: 'scope'});
			arr.push(T);
			this.style.Results.rolling_reg.forEach(function(rolling_reg) {
				var h = rolling_reg[1].betas
				var year = rolling_reg[0].year;
				var month = rolling_reg[0].month;
				var day = rolling_reg[0].day;
				h.unshift(new Date(year + "-" + month + "-" + day));
				h.push(rolling_reg[2]);
				arr.push(h);
			})
			var data = new google.visualization.arrayToDataTable(arr);
			var options = {
				"legend": {
					"position": "none"
				},
				hAxis: {
					"title": "Time"
				},
				colors: ['#1e5adc'],
				title: "Rolling Factor Sensitivities",
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.LineChart(document.getElementById('rollbeta_div'));
			chart.draw(data, options);
		},

		scatterChart() {
			var arr = [
				['Benchmark', 'Coin']
			];

			for(var t = 0; t < this.style.Results.T; t++) {
				var h = [this.style.Results.common_data.iloc[t][1], this.style.Results.common_data.iloc[t][0]];
				arr.push(h);
			}

			var data = new google.visualization.arrayToDataTable(arr);

			var options = {
				title: "Portfolio vs. " + this.style.Results.factor_names[0],
				legend: {
					'position': 'none'
				},
				colors: ['#1e5adc'],
				width: 1130,
				height: 500,
				vAxis:{format:'0.00%',"title": "Portfolio"},  
				hAxis:{format:'0.00%',"title": this.style.Results.factor_names[0]+" Factor"}
			};
			var chart = new google.visualization.ScatterChart(document.getElementById('scatter_div'));
			chart.draw(data, options);
		},

		radarChart() {
			var labels = [];
			var data = [];
			for(var i = 0; i <= this.style.Results.N - 1; i++) {
				var h = this.style.Results.factor_names[i];
				labels.push(h);
			}
			for(var i = 0; i <= this.style.Results.N - 1; i++) {
				var h = this.style.Results.reg_analysis.crisk[i];
				data.push(h);
			}
			var radarChartData = {
				labels: labels,
				datasets: [{
					label: "Contribution To Risk",
					fillColor: "rgba(193,11,11,0.5)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#166f7e",
					pointHighlightFill: "#166f7e",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: data
				}]
			};
			var chart_radarChart = document.getElementById('radarChart').getContext('2d');
			new Chart(chart_radarChart).Radar(radarChartData, {
				responsive: true
			});
		},

		RollingCRisk() {
			var arr = [];
			var m = ['Date'];
			for(var i = 0; i < this.style.Results.N; i++) {
				m.push(this.style.Results.factor_names[i]);
			}
			arr.push(m);
			this.style.Results.rolling_reg.forEach((rolling_reg) => {
				var dt = rolling_reg[0];
				var reg = rolling_reg[1]
				var n = [new Date(dt.year, dt.month, dt.day)];
				for(var i = 0; i < this.style.Results.N; i++) {
					n.push(reg.crisk[i]);
				}
				arr.push(n);
			});
			var data = new google.visualization.arrayToDataTable(arr);
			var options = {
				vAxis:{format:'0.00%',"title": "Factors Correlation"},  
				hAxis:{format:'0.00%',"title": "Date"},
				title: "Rolling Factor Risk Contribution",
				colors: ['#1e5adc', '#f39800'],
				legend: {
					position: "right"
				},
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.AreaChart(document.getElementById('rollcrisk_div'));
			chart.draw(data, options);
		},

		/*risk*/

		RiskVsReturnChart() {
			var arr = [
				['Coin', 'Risk %', 'Return %']
			];
			for(var i = 0; i < this.risk.N; i++) {
				var h = [];
				h.push(this.risk.Coins[i].Name);
				h.push(this.risk.crisk[i]);
				h.push(this.risk.c_ret[i]);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				chartArea: {
					width: '50%'
				},
				title: "Risk vs. Return",
				legend: {
					'position': 'right'
				},
				/*vAxis: {
					format: '0.00%'
				},*/
				colors: ['#1e5adc', '#f39800'],
				hAxis: {
					format: '0.00%'
				},
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.BarChart(document.getElementById('risk_ret_div'));
			chart.draw(data, options);
		},

		MarginalVaRChart() {
			var arr = [
				['Coin', 'Marginal VaR']
			];
			for(var i = 0; i < this.risk.N; i++) {
				var h = [];
				h.push(this.risk.Coins[i].Name);
				h.push(this.risk.marginal_vars[i]);
				arr.push(h);
			}
			var data = google.visualization.arrayToDataTable(arr);
			var options = {
				chartArea: {
					width: '50%'
				},
				title: "Marginal VaR",
				legend: {
					'position': 'none'
				},
				vAxis: {
					format: '0.00%'
				},
				colors: ['#1e5adc'],
				hAxis: {
					format: '0.00%'
				},
				width: 1130,
				height: 500
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('marginal_var_div'));
			chart.draw(data, options);
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

		getOptimization() {
			this.loading = true;
			this.opacity = 0;
			axios.get(window.reqUrl + "/get/reports/portfolio/optimization/" + this.url, {
					params: {
						token: localStorage.getItem("token"),
						risk_fun:this.risk_fun
					}
				})
				.then((response) => {
					setTimeout(()=>{
						this.loading = false;
						this.opacity = 1;
					},1500);						
					if(response.data.error == 0) {
						this.optimization = response.data.data;
						this.range = this.optimization.bestFolio;
						google.charts.setOnLoadCallback(this.frontier_chart);
						google.charts.setOnLoadCallback(this.RegressionCharts);						
						google.charts.setOnLoadCallback(this.frontierAllocs);
						google.charts.setOnLoadCallback(this.drawChart);
					} 
					else if(response.data.error==408){
						location.href="share.html?folio_id=" + this.url;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
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
						google.charts.setOnLoadCallback(this.drawHistogram);
						google.charts.setOnLoadCallback(this.drawReturns);
						google.charts.setOnLoadCallback(this.drawMDD);
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getAi() {
			this.loading = true;
			this.opacity = 0;
			axios.get(window.reqUrl + "/get/reports/portfolio/ai/" + this.url, {
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
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		percent() {
			google.charts.setOnLoadCallback(this.drawTimeLine);
			google.charts.setOnLoadCallback(this.ReturnChart);
		},

		getStyle() {
			this.loading = true;
			this.opacity = 0;
			axios.get(window.reqUrl + "/get/reports/portfolio/style/" + this.url, {
					params: {
						factor_code: this.styleFactor,
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					setTimeout(()=>{
						this.loading = false;
						this.opacity = 1;
					},1500);	
					if(response.data.error == 0) {
						this.style = response.data.data; //response.data.data
						google.charts.setOnLoadCallback(this.Betas);
						google.charts.setOnLoadCallback(this.RSQGauge);
						google.charts.setOnLoadCallback(this.RollingBetas);
						google.charts.setOnLoadCallback(this.RollingCRisk);
						for(var i = 0; i < this.style.Results.N - 1; i++) {
							google.charts.setOnLoadCallback(this.scatterChart);
						}
						google.charts.setOnLoadCallback(this.radarChart);
						google.charts.setOnLoadCallback(this.RollingCRisk);
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getBenchmark() {
			axios.get(window.reqUrl + "/get/reports/portfolio/benchmark/" + this.url, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.benchmark = response.data.data;
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getRatios() {
			axios.get(window.reqUrl + "/get/reports/portfolio/ratios/" + this.url, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.ratios = response.data.data;
					} else {
						//alert(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getRisk() {
			axios.get(window.reqUrl + "/get/reports/portfolio/risk/" + this.url, {
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.risk = response.data.data;
						google.charts.setOnLoadCallback(this.RiskVsReturnChart);
						google.charts.setOnLoadCallback(this.MarginalVaRChart);
					} else {
						//alert(response.data.message);
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
		}
	},

	created() {
		this.url = this.getQueryString("folio_id");
		google.charts.load("current", {
			packages: ["corechart", "controls", "bar", "timeline", "gauge"]
		});
		this.getPortfolio();
		this.getOptimization();
		this.getBasic();
		this.getAi();
		this.getStyle();
		//this.getBenchmark();
		this.getRatios();
		this.getRisk();
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

	watch:{
		range(){
			google.charts.setOnLoadCallback(this.drawChart);
			google.charts.setOnLoadCallback(this.RegressionCharts);	
			if(this.frontier){
				this.frontier.setSelection([{row:this.range,column:1}]);
			}			
		}
	}
})