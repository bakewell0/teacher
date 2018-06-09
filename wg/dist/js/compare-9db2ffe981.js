var vm=new Vue({el:"#app",data:{url:"{folio_id}",versus:{},factorModel:"bitcoin",pos:0,peer_stats_first:{},peer_stats_other:[]},methods:{getQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),s=window.location.search.substr(1).match(t);return null!=s?unescape(s[2]):null},distChart(){var e=[];this.versus.PeerStats.peer_stats.forEach(function(t){var s=[t.Name,t.peer_stats.worst,t.peer_stats.mean-t.peer_stats.std,t.peer_stats.mean+t.peer_stats.std,t.peer_stats.best];e.push(s)});var t=google.visualization.arrayToDataTable(e,!0);new google.visualization.CandlestickChart(document.getElementById("distChartDiv")).draw(t,{legend:"none",title:"Return Distribution Comparison",vAxis:{format:"0.00%"},width:1140,height:500})},drawRiskReturnChart(){var e=[["ID","AnnVol","Annualized Return","Max Drawdown","Correlation"]];this.versus.PeerStats.peer_stats.forEach(t=>{var s=[t.Name,t.peer_stats.ann_std,t.peer_stats.ann_return,t.peer_stats.maxdd,t.corr];e.push(s)});var t=google.visualization.arrayToDataTable(e);new google.visualization.BubbleChart(document.getElementById("riskreturndiv")).draw(t,{title:"Risk vs. Return",hAxis:{title:"Annualized Volatility",format:"0.00%"},vAxis:{title:"Annualized Return",format:"0.00%"},bubble:{textStyle:{fontSize:11}},colorAxis:{colors:["red","green"],title:"Max DD",format:"0.00%"},width:1140,height:500})},drawBetas(e){this.betas(this.peer_stats_first);for(var t=0;t<this.peer_stats_other.length;t++)this.betas(this.peer_stats_other[t])},betas(e){for(var t=[["Factor","Beta"]],s=0;s<this.versus.NFactors;s++){var a=[e.factors[s].Name,e.peer_style.betas[s]];t.push(a)}var r=new google.visualization.arrayToDataTable(t),i=document.createElement("div");i.id="style_"+e.index,document.querySelector("[name=style"+e.index+"]").appendChild(i),new google.visualization.ColumnChart(i).draw(r,{min:-1,chartArea:{width:"40%"},max:1,hAxis:{format:"0.00"},legend:{position:"none"},colors:["#1e5adc"],title:"Factor Sensitivies R-Sq: %"})},drawRegimes(e){this.regimes(this.peer_stats_first);for(var t=0;t<this.peer_stats_other.length;t++)this.regimes(this.peer_stats_other[t])},regimes(e){for(var t=[["Regime","Avg Return"]],s=0;s<e.regime_stats.N;s++){var a=[e.regime_stats.regimes[s],e.regime_stats.avg.iloc[s][0]];t.push(a)}var r=new google.visualization.arrayToDataTable(t),i=document.createElement("div");i.id="regime_"+e.index,document.querySelector("[name=regime"+e.index+"]").appendChild(i),new google.visualization.ColumnChart(i).draw(r,{vAxis:{format:"0.00%"},colors:["#1e5adc"],legend:{position:"none"},title:"Regime Performance"})},goUp(){this.pos<0&&(this.pos=this.pos+100,$(".slider").animate({left:this.pos+"%"}))},goDown(){this.pos>-100*(this.peer_stats_other.length-1)&&(this.pos=this.pos-100,$(".slider").animate({left:this.pos+"%"}))},getVersus(){axios.get(window.reqUrl+"/get/reports/portfolio/versus/"+this.url,{params:{factor_code:this.factorModel,token:localStorage.getItem("token")}}).then(e=>{if(0==e.data.error){this.versus=e.data.data,this.peer_stats_first=this.versus.PeerStats.peer_stats[0];for(var t=1;t<this.versus.PeerStats.peer_stats.length;t++)this.peer_stats_other.push(this.versus.PeerStats.peer_stats[t]);google.charts.load("current",{packages:["gauge","corechart","bar"]}),google.charts.setOnLoadCallback(this.distChart),google.charts.setOnLoadCallback(this.drawRiskReturnChart),google.charts.setOnLoadCallback(this.drawBetas),google.charts.setOnLoadCallback(this.drawRegimes)}else alert(e.data.message),403==e.data.error&&(location.href="login.html")}).catch(function(e){console.log(e)})}},created(){this.url=this.getQueryString("folio_id"),this.getVersus()},computed:{nickName(){return this.getQueryString("nickName")}}});