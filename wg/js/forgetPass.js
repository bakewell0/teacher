var vm = new Vue({
	el: "#app",
	data() {
		var validatePass = (rule, value, callback) => {
			if(value === '') {
				callback(new Error('please enter your password'));
			} else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value)) {
				callback(new Error('Need to include letters and numbers, at least 6 digits, up to 18 digits'));
			} else {
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
				pass: '',
				checkPass: ''
			},
			rules2: {
				pass: [{
					required: true,
					validator: validatePass,
					trigger: 'blur'
				}],
				checkPass: [{
					required: true,
					validator: validatePass2,
					trigger: 'blur'
				}]
			}
		}
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
		reset() {
			var btn=document.querySelector("#btn");
			btn.disabled=true;
			btn.style.background="gray";
			btn.style.cursor="not-allowed";
			axios.post(window.pcUrl, {
					actionCode: 'resetPassword',
					newPassword: $.md5(this.ruleForm2.pass),
					email:this.getQueryString("email"),
					checkCode:this.getQueryString("checkCode")					
				})
				.then(function(response) {
					if(response.data.meta.errno==0){
						location.href="login.html";
					}
					else{
						alert(response.data.meta.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		resetPassword(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					this.reset();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
})