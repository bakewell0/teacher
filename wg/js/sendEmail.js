var vm = new Vue({
	el: "#app",
	data() {
		return {
			ruleForm2: {
				loginName: '',
			},
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
			}
		}
	},
	methods: {
		send() {
			var btn=document.querySelector("#btn");
			btn.disabled=true;
			btn.style.background="gray";
			btn.style.cursor="not-allowed";
			axios.post(window.pcUrl, {
					actionCode: 'sendResetpassMail',
					email: this.ruleForm2.loginName
				})
				.then(function(response) {
					alert(response.data.meta.msg);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		sendEmail(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					this.send();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
})