var randomNum;
var vm = new Vue({
	el: "#app",
	data: {
		loginForm: {
			loginName: localStorage.getItem("loginName"),
			loginPassword: localStorage.getItem("loginPassword"),
			captchaCode: '',
			checked:localStorage.getItem("checked")
		},
		rules: {
			loginName: [{
					required: true,
					message: 'please enter your email address',
					trigger: 'blur'
				},
				{
					type: 'email',
					message: 'please enter your correct email address',
					trigger: ['blur', 'change']
				}
			],
			loginPassword: [{
				required: true,
				message: 'please enter your password',
				trigger: 'blur'
			}],
			captchaCode: [{
				required: true,
				message: 'please enter your captcha code',
				trigger: 'blur'
			}]
		},
		reqUrl: "http://13.228.40.104:80/api-1.0.0/api/action.do",
		captchaImgUrl: ''
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					this.login();
				}
			})
		},

		login() {
			axios.post(window.pcUrl, {
					actionCode: 'login',
					loginName: this.loginForm.loginName,
					loginPassword: $.md5(this.loginForm.loginPassword),
					kaptchaNum: this.loginForm.captchaCode,
					kaptchaRandomNum: randomNum
				})
				.then((response) => {
					if(response.data.meta.errno == 0) {
						localStorage.setItem("token", response.data.result.data.token);
						//localStorage.setItem("status", response.data.result.data.status);
						localStorage.setItem("type", response.data.result.data.type);
						localStorage.setItem("logoUrl", response.data.result.data.logoUrl);
						localStorage.setItem("referName", response.data.result.data.referName);
						localStorage.setItem("referId", response.data.result.data.referId);
						localStorage.setItem("loginName", response.data.result.data.loginName);
						location.href = "index.html";				
					}
					else{
						$("#captcha").trigger("click");
						alert(response.data.meta.msg);						
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		ck() {
			if(!this.loginForm.checked){
				localStorage.setItem("loginName", this.loginForm.loginName);
				localStorage.setItem("loginPassword", this.loginForm.loginPassword);
				localStorage.setItem("checked", !this.loginForm.checked)
			}
			else{
				localStorage.removeItem("loginName");
				localStorage.removeItem("loginPassword");
				localStorage.removeItem("checked")
			}			
		},
		
		send() {
			axios.post(window.pcUrl, {
					actionCode: 'sendActivateMail',
					token: localStorage.getItem("token")
				})
				.then(function(response) {
					alert(response.data.meta.msg);
					location.href = "index.html";
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		
		getCaptchaImage() {
			randomNum = Math.floor(Math.random() * 10000).toString();
			axios.post(window.captchaUrl, {
					random: randomNum
				})
				.then((response) => {
					this.captchaImgUrl = 'data:image/jpeg;base64,' + response.data.result.data.img;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},

	created: function() {
		this.getCaptchaImage();
	}
})