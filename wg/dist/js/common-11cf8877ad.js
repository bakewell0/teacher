window.reqUrl = "http://13.228.40.104:7000/coinai";
//window.reqUrl = "http://rap2api.taobao.org/app/mock/10162/"
window.pcUrl = "http://13.228.40.104:80/api-1.0.0/api/action.do";
window.pcUploadUrl = "http://13.228.40.104:80/api-1.0.0/api/upload.do";
window.captchaUrl = "http://13.228.40.104:80/api-1.0.0/kaptcha/kaptcha.do";

/*axios.interceptors.request.use(
config => {
showFullScreenLoading();
return config
},
error => {
return Promise.reject(error)
}
);

axios.interceptors.response.use((res) => {
tryHideFullScreenLoading();
return res;
}, (error) => {
return Promise.reject(error);
});

var needLoadingRequestCount = 0;

function showFullScreenLoading() {
if(needLoadingRequestCount === 0) {
startLoading()
}
needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
if(needLoadingRequestCount <= 0) return
needLoadingRequestCount--
if(needLoadingRequestCount === 0) {
endLoading()
}
}

var loading = 0;

function startLoading() {
loading = Vue.prototype.$loading({
lock: true,
text: 'Loading',
spinner: 'el-icon-loading',
background: 'rgba(0, 0, 0, 0.7)'
});
}

function endLoading() {
loading.close();
}*/

Vue.component('navmenu', {
	props:{
		showUser: {   // 可选字段，有默认值
    		default: true
  		},
  		background:{
  			default: ""
  		}
	},
	data: () => {
		return {
			myPortfolio: [],
			referName:localStorage.getItem("token") ? localStorage.getItem("referName") : "",
			head_img_url:localStorage.getItem("token") ? localStorage.getItem("head_img_url") : "",
			hasToken:localStorage.getItem("token")			
		}
	},
	methods: {
		getMyPortfolio() {
			axios.get(window.reqUrl + "/get/portfolio/oneself/folioidlist", {			
					params: {
						token: localStorage.getItem("token")
					}
				})
				.then((response) => {
					if(response.data.error == 0) {
						this.myPortfolio = response.data.data.folio_ids;
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
		logout(){
			localStorage.removeItem("token");
			location.href="login.html";
		}
	},

	template: 
	`<div class="banner_top" :style="{height:'80px',background:background}">
			<div class="top cf w1170">
				<a href="index.html">
					<img src="img/logo.png" class="j41 lf" />
					<img src="img/logoName.png" alt="" class="logoName"/>
				</a>
				
				<ul class="lf cf top_nav">
					<li>
						<a href="index.html">HOME</a>
					</li>
					<li v-show="myPortfolio.length">
						<el-dropdown>
							<span class="el-dropdown-link" style="color: white;line-height: 44px;font-weight: bold;cursor: pointer;">
							    MY PORTFOLIO<i class="el-icon-arrow-down el-icon--right"></i>
							  </span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="(item,index) in myPortfolio">
									<a :href="'portfolios.html?folio_id='+item">PORTFOLIO {{index+1}}</a>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li>
						<a href="portfoliosList.html">RANKING</a>
					</li>
					<li>
						<a href="coinList.html">CRYPTO ANALYSIS</a>
					</li>
					<li>
						<a href="index.html#aboutbox">ABOUT COINAI</a>
					</li>
					<li>
						<a href="https://www.banca.world/" target="_blank">BANCA</a>
					</li>
				</ul>
				<div v-if="showUser" class="clearfix">
					<a href="login.html" class="login" v-if="!hasToken">LOGIN</a>
					<a href="register.html" class="signUp" v-if="!hasToken">SIGN UP</a>
					<div class="userinfo" v-if="hasToken" v-cloak>
						
						<a href="userCenter.html"><i>{{referName}}</i><img :src="head_img_url" alt="" class="sculpture"></a>
						<img src="img/logout.png" alt="" class="logout" @click="logout"/>
					</div>
				</div>
			</div>
		</div>`,

	created() {
		if(this.showUser){
			this.getMyPortfolio();
		}
	}
});

Vue.component('footmenu', {
	template:`<div class="footer">
			<div class="w1170">
				<div class="footerItem" style="margin-right: 300px;">
					<img src="img/logo2.png" alt="" style="margin-right: 40px;">
					<img src="img/logo3.jpg" alt="">
				</div>
				<div class="footerItem">
					<p class="first">Contact US</p>
					<p class="second">EMAIL：coinai@banca.world</p>
					<p class="second">
						<img border="0" hspace="0" vspace="0" src="https://icon.cnzz.com/img/pic.gif">
					</p>
					<p class="second">Copyright © Banca All Rights Reserved .</p>
				</div>
			</div>
		</div>`
})

	









