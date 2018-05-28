window.reqUrl="http://13.228.40.104:80/api-1.0.0/api/action.do";

Vue.component('sidebar', {

	data: () => {
		return {
			showEmail:false
		}
	},
	
	template:`<ul class="sideBar">
				<li>
					<a href="https://t.me/banca_official" target="_blank"><img src="img/s1.png" alt="" /></a>
					<i></i>
				</li>
				<li>
					<a href="https://twitter.com/Banca_Official" target="_blank">
						<img src="img/s2.png" alt="" />
					</a>
					<i></i>
				</li>
				<li style="position: relative;" @mouseenter="showE" @mouseleave="hideE">
					<a href="">
						<img src="img/s3.png" alt="" />
					</a>
					<div class="email" v-show="showEmail">
						Email - info@banca.world
					</div>	
					<i></i>
				</li>
				<li>
					<a href="https://bitcointalk.org/index.php?topic=2725461.new#new" target="_blank">
						<img src="img/s4.png" alt="" />
					</a>
					<i></i>
				</li>
				<li>
					<a href="https://www.reddit.com/r/Bancaworld/" target="_blank">
						<img src="img/s5.png" alt="" />
					</a>
					<i></i>
				</li>
			</ul>`,
	methods:{
		showE(){
			this.showEmail=true;
		},
		hideE(){
			this.showEmail=false;
		}
	},
	created(){
		console.log(this.showEmail);
	}
})
