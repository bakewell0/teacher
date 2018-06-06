var randomNum;
new Vue({
	el: "#app",
	data() {
		var validatePass = (rule, value, callback) => {
			if(value === '') {
				callback(new Error('please enter your password'));
			} 
			else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value)){
				callback(new Error('Need to include letters and numbers, at least 6 digits, up to 18 digits'));
			}
			else {
				if(this.ruleForm2.checkPass !== '') {
					this.$refs.ruleForm2.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if(value === '') {
				callback(new Error('please enter your password'));
			} else if(value !== this.ruleForm2.pass) {
				callback(new Error('The two input passwords do not match.!'));
			} else {
				callback();
			}
		};
		return {
			ruleForm2: {
				loginName: '',
				nickName: '',
				pass: '',
				checkPass: '',
				captchaCode: ''
			},
			captchaImgUrl: '',
			checked:true,
			checkError:false,
			rules2: {
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
				nickName: [{
					required: true,
					message: 'please enter your nickName',
					trigger: 'blur'
				}],
				pass: [{
					validator: validatePass,
					trigger: 'blur'
				}],
				checkPass: [{
					validator: validatePass2,
					trigger: 'blur'
				}],
				captchaCode:[{
					required: true,
					message: 'please enter the captchaCode',
					trigger: 'blur'
				}]
			}
		};

	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if(!this.checked){
					this.checkError=true;
					return;
				}
				else{
					this.checkError=false;
				}
				
				if(valid) {
					this.userRegister();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		userRegister() {
			var _this = this;
			axios.post(window.pcUrl, {
					actionCode: 'userRegister',
					loginName: this.ruleForm2.loginName,
					nickName: this.ruleForm2.nickName,
					loginPassword: $.md5(this.ruleForm2.pass),
					kaptchaNum: this.ruleForm2.captchaCode,
					kaptchaRandomNum: randomNum
				})
				.then(function(response) {
					if(response.data.meta.errno==0){
						_this.goToValidate(response.data);
					}
					else{
						alert(response.data.meta.msg);		
						if(response.data.meta.errno=="SYS0018"){
							$("#captcha").trigger("click");
						}
					}										
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		goToValidate(data) {
			if(data.meta.errno == 0) {
				//localStorage.setItem("status", data.result.data.status);
				localStorage.setItem("token", data.result.data.token);
				this.send();
			} else {
				alert(data.meta.msg);
			}
		},
		send() {
			axios.post(window.pcUrl, {
					actionCode: 'sendActivateMail',
					token: localStorage.getItem("token")
				})
				.then(function(response) {
					// alert(response.data.meta.msg);
					location.href="userCenter.html";
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
	created() {
		this.getCaptchaImage();
	},
	watch:{
		checked(){
			if(this.checked){
				this.checkError=false;
			}
		}
	}
})