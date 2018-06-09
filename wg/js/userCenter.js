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
			user_navs: ["Account", "Security"],
			nav_index: 0,
			userCenter: {
				head_img_url: "img/w5.png",
				userName: localStorage.getItem("referName")
			},
			token: localStorage.getItem("token"),
			followProjects: [],
			isEdit: false,
			isActive: false,
			isShowBar: false, //显示激活条
			pcUploadUrl: window.pcUploadUrl,
			ruleForm2: {
				oldPass: '',
				pass: '',
				checkPass: ''
			},
			rules2: {
				oldPass: [{
					required: true,
					message: 'please enter your current password',
					trigger: 'blur'
				}],
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
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},

		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if(!isJPG) {
				this.$message.error('Please upload jpg, jpeg or png picture');
			}
			if(!isLt2M) {
				this.$message.error('Please upload a file size not more than 2MB');
			}
			return isJPG && isLt2M;
		},

		getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {
				return unescape(r[2]);
			}
			return null;
		},
		tab(index) {
			this.nav_index = index;
		},
		edit() {
			this.isEdit = !this.isEdit;
		},
		editUserDetail(params) {
			axios.post(window.pcUrl, {
					actionCode: 'editUserDetail',
					token: localStorage.getItem("token"),
					nickName: params.nickName,
					headImgUrl: params.headImgUrl,
					loginPassword: params.loginPassword,
					oldPassword: params.oldPassword
				})
				.then(function(response) {
					alert(response.data.meta.msg);
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		handleAvatarSuccess(result) {
			if(result.meta.errno == 0) {
				this.userCenter.head_img_url = result.result.data + "?ver=" + Math.random();
				var params = {
					nickName: this.userCenter.userName,
					headImgUrl: this.userCenter.head_img_url
				}
				this.editUserDetail(params);
				//写入
				localStorage.setItem("head_img_url",this.userCenter.head_img_url);
				this.$children[0].head_img_url = this.userCenter.head_img_url;
			}
		},

		saveName() {
			var params = {
				nickName: this.userCenter.userName,
				headImgUrl: this.userCenter.head_img_url
			}
			this.editUserDetail(params);
			this.isEdit = false;
		},

		savePassword(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					var params = {
						loginPassword: $.md5(this.ruleForm2.pass),
						oldPassword: $.md5(this.ruleForm2.oldPass)
					}
					this.editUserDetail(params);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		queryUserDetail() {
			axios.post(window.pcUrl, {
					actionCode: 'queryUserDetail',
					token: localStorage.getItem("token")
				})
				.then((response) => {
					var data = response.data;
					if(data.meta.errno == 0) {
						this.userCenter = data.result.data;
						this.getActiveStatus();
						//修改后
						if(this.userCenter.userName) {
							localStorage.setItem("referName", this.userCenter.userName);
						}
						if(this.userCenter.head_img_url) {
							localStorage.setItem("head_img_url", this.userCenter.head_img_url);
						}
					} else {
						alert(data.meta.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		validate() {
			if(!this.currentPassword) {
				alert("current password is empity");
				return false;
			} else if(!this.newPassword) {
				alert("new password is empity");
				return false;
			} else if(!this.confimPassword) {
				alert("confim password is empity");
				return false;
			} else if(this.newPassword = !this.confimPassword) {
				alert("two passwords are different");
				return false;
			}
			return true;
		},
		getActiveStatus() {
			var _this = this;
			if(!this.getQueryString("activateCode")) {
				if(this.userCenter.status == 2) {
					this.isActive = false;
					this.isShowBar = true;
				} else {
					this.isShowBar = false;
				}
				return;
			}
			axios.post(window.pcUrl, {
					actionCode: 'mailActivate',
					token: localStorage.getItem("token"),
					activateCode: _this.getQueryString("activateCode"),
					mailId: _this.getQueryString("mailId")
				})
				.then((response) => {
					var data = response.data;
					if(data.meta.errno == 0) {
						$(".user-active").fadeIn();
						setTimeout(function() {
							$(".user-active").fadeOut();
						}, 2000);						
						/*引导创建投资组合*/
						this.$confirm('Congratulations! You can now create your first portfolio!', 'success', {					
							confirmButtonText: 'Create Your Own Portfolio',
							showCancelButton:false,
							type: 'success',
							center: true
						}).then(() => {
							location.href="createPortfolios.html";					
						}).catch(() => {
							
						});						
					} else {
						alert(data.meta.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		resend() {
			axios.post(window.pcUrl, {
					actionCode: 'sendActivateMail',
					token: localStorage.getItem("token")
				})
				.then(function(response) {
					alert(response.data.meta.msg);
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	created: function() {
		if(this.getQueryString("token")) {
			localStorage.setItem("token", this.getQueryString("token"));
		}
		this.queryUserDetail();
	}
})