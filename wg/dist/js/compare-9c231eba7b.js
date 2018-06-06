var vm=new Vue({
	el: "#app",
	data: {
		url: '{folio_id}',
		versus: {},
		factorModel: "bitcoin",
		pos: 0,
		peer_stats_first:{},
		peer_stats_other:[]
	},
	methods: {
		getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {
				return unescape(r[2]);
			}
			return null;
		},
				
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
				width: 1140,
				height: 500
			};
			var chart = new google.visualization.BubbleChart(document.getElementById('riskreturndiv'));
			chart.draw(data, options);
		},

		drawBetas(index) {
			this.betas(this.peer_stats_first);
			for(var i=0;i<this.peer_stats_other.length;i++){
				this.betas(this.peer_stats_other[i]);
			}			
		},
        
        betas(stat){
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
					colors: ['#1e5adc'],
					title: 'Factor Sensitivies R-Sq: %'
			};
			var div = document.createElement("div");
			div.id = "style_" + stat.index;
			document.querySelector("[name=style"+stat.index+"]").appendChild(div);
			var chart = new google.visualization.ColumnChart(div);
			chart.draw(data, options);				
        },

		drawRegimes(stat) {
			this.regimes(this.peer_stats_first);
			for(var i=0;i<this.peer_stats_other.length;i++){
				this.regimes(this.peer_stats_other[i]);
			}
		},

		regimes(stat){
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
					title: "Regime Performance"
				};

				var div = document.createElement("div");
				div.id = "regime_" + stat.index;
				document.querySelector("[name=regime"+stat.index+"]").appendChild(div);
				var chart = new google.visualization.ColumnChart(div);
				chart.draw(data, options);
		},
		
		goUp() {
			if(this.pos<0){
				this.pos = this.pos + 100;
				$(".slider").animate({
					"left": this.pos + "%"
				});
			}			
		},

		goDown() {
			if(this.pos>(this.peer_stats_other.length-1)*-100){
				this.pos = this.pos - 100;
				$(".slider").animate({
					"left": this.pos + "%"
				});
			}
		},

		getVersus() {
			axios.get(window.reqUrl + "/get/reports/portfolio/versus/" + this.url, {
					params: {
						factor_code: this.factorModel,
						token:localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.versus = response.data.data; //response.data.data;
						this.peer_stats_first = this.versus.PeerStats.peer_stats[0];
						for(var i=1;i<this.versus.PeerStats.peer_stats.length;i++){
							this.peer_stats_other.push(this.versus.PeerStats.peer_stats[i]);
						}
						google.charts.load('current', {
							'packages': ['gauge', "corechart", "bar"]
						});
						google.charts.setOnLoadCallback(this.distChart);
						google.charts.setOnLoadCallback(this.drawRiskReturnChart);
						google.charts.setOnLoadCallback(this.drawBetas);
						google.charts.setOnLoadCallback(this.drawRegimes);
					}
					else{
						alert(response.data.message);
						if(response.data.error == 403){
							location.href="login.html";
						}
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	created() {
		this.url=this.getQueryString("folio_id");
		this.getVersus();
	},
	computed:{
		nickName(){
			return this.getQueryString("nickName");
		}
	}
})