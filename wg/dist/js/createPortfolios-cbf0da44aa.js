var vm = new Vue({
	el: "#app",
	data: {
		state: 0,
		isMask: false,
		records: [],
		coinName: '',
		coinsList: [],
		cash: 100,
		option_one: -1,
		option_two: -1,
		option_three: -1,
		isChooseCoin: false,
		searchContent: false,
		exceed:false
	},
	methods: {
		ch(e, coin_id, coin_name) {
			if(e.target.classList[1] == "cur") {
				e.target.classList.remove("cur");
			} else {
				e.target.classList.add("cur");
				this.records.push({
					"coin_id": coin_id,
					"coin_name": coin_name,
					"num": 1
				})
			}
		},

		submitChoose() {
			this.isChooseCoin = false;
			this.isMask = false;
		},

		getCoinsList() {
			axios.get(window.reqUrl + "/get/coins/namelist", {
					params: {
						name: this.searchFilter
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.coinsList = response.data.data;
					}
					if(response.data.error == 403) {
						location.href = "login.html"
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		cancelMask() {
			this.state = 1;
		},
		submit() {
			if(!this.validate()) {
				return;
			}
			if(!localStorage.getItem("token")) {
				location.href = "login.html";
			}
			var records = [];
			this.records.forEach(function(record) {
				var h = {
					"coin_name": record.coin_name,
					"weight": record.num / 100,
					"coin_id": record.coin_id
				};
				records.push(h);
			})

			axios.post(window.reqUrl + "/add/portfolio", {
					portfolios: records,
					token: localStorage.getItem("token")
				})
				.then(function(response) {
					if(response.data.error != 0) {
						alert(response.data.message);
						if(response.data.error == 410) {
							location.href = "userCenter.html";
						}
					} else {
						location.href = "portfolios.html?folio_id=" + response.data.data.folio_id;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		submitQuestion() {
			var params = {
				option_one: Number(this.option_one),
				option_two: Number(this.option_two),
				option_three: Number(this.option_three),
				token: localStorage.getItem("token")
			}
			axios.post(window.reqUrl + "/add/user/survey", params)
				.then(function(response) {
					alert(response.data.message);
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		validate() {
			var flag = true;
			this.records.forEach(function(item, index) {
				if(item.num < 0 || item.num > 100 || !item.num) {
					alert("the weight you entered is wrong");
					flag = false;
				}
			});
			return flag;
		},

		changeNum(e) {
			var sum = 0;		
			this.records.forEach((item, index)=> {
				sum = sum + Number(item.num);			
			});
			if(sum<=100){
				this.cash = 100 - sum;
				this.exceed=false;
			}
			else{
				this.records[this.records.length-1].num="";
			}
		},

		remove(index) {
			this.cash = this.cash + Number(this.records[index].num);
			this.records.splice(index, 1);
		},

		increase(index) {
			if(this.records[index].num < 100) {
				this.records[index].num++;
				this.cash = this.cash - 1;
			}			
		},

		decrease(index) {
			if(this.records[index].num > 0) {
				this.records[index].num--;
				this.cash = this.cash + 1;
			}
		},

		checkCoin(coin_id) {
			var result = true;
			this.records.forEach((record) => {
				if(record.coin_id == coin_id) {
					result = false;
				}
			})
			return result;
		},
		
		checkCash(){
			if(this.cash==0){
				this.exceed=true;
			}
			else{
				this.exceed=false;
			}
		},
		
		addCoin(coin_id, coin_name) {
			this.checkCash();
			if(!this.checkCoin(coin_id)||this.cash==0) {
				return;
			}
			this.records.push({
				"coin_name": coin_name,
				"coin_id": coin_id,
				"num": 1
			});
			this.cash = this.cash - 1;
			this.searchContent = false;
		},

		selectCoin(type) {
			var coin_id = "";
			this.coinsList.forEach((coin) => {
				if(coin.coin_name.toLowerCase() == type) {
					coin_id = coin.coin_id;
				}
			})
			return coin_id;
		},

		addBTC() {
			this.checkCash();
			var coin_id = this.selectCoin("bitcoin");
			if(!this.checkCoin(coin_id)||this.cash==0) {
				return;
			}
			this.records.push({
				"coin_id": coin_id,
				"coin_name": "Bitcoin",
				"num": 1
			})
			this.cash = this.cash - 1;
		},

		addETH() {
			this.checkCash();
			var coin_id = this.selectCoin("ethereum");
			if(!this.checkCoin(coin_id)||this.cash==0) {
				return;
			}
			this.records.push({
				"coin_id": coin_id,
				"coin_name": "Ethereum",
				"num": 1
			})
			this.cash = this.cash - 1;
		},

		addEOS() {
			this.checkCash();
			var coin_id = this.selectCoin("eos");
			if(!this.checkCoin(coin_id)||this.cash==0) {
				return;
			}
			this.records.push({
				"coin_id": coin_id,
				"coin_name": "EOS",
				"num": 1
			})
			this.cash = this.cash - 1;
		},

		addBANCA() {
			this.checkCash();
			var coin_id = this.selectCoin("banca");
			if(!this.checkCoin(coin_id)||this.cash==0) {
				return;
			}
			this.records.push({
				"coin_id": coin_id,
				"coin_name": "Banca",
				"num": 1
			})
			this.cash = this.cash - 1;
		},

		getSurveyState() {
			axios.get(window.reqUrl + "/get/user/survey/state", {
					params: {
						token: localStorage.getItem("token")
					}
				}).then((response) => {
					if(response.data.error == 0) {
						this.state = response.data.data.state;
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
		/*autocomplete*/
		querySearch(queryString, cb) {
			var coinsList = this.coinsList;
			coinsList = queryString ? coinsList.filter(this.createFilter(queryString)) : coinsList;
			// 调用 callback 返回建议列表的数据
			cb(coinsList);
		},
		createFilter(queryString) {
			return(coin) => {
				return(coin.coin_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || coin.simple_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		handleSelect(item) {
			this.coinName = item.coin_name;
			this.addCoin(item.coin_id, item.coin_name);
		},
		handleIconClick(ev) {
			console.log(ev);
		}
	},
	created() {
		this.getCoinsList();
	},
	watch: {
		records: {
	　　　　handler(newValue, oldValue) {
				var sum = 0;
				newValue.forEach((item, index)=> {
					if(item.num.toString().indexOf('-')>-1 || item.num.toString().indexOf('.')>-1 || Number(item.num)>100) {
						item.num = "";
					}									
				});																		
	　　　　},
	　　　　deep: true
　　		}
	}
})