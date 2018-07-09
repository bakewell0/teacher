window.pcUrl = "http://13.228.40.104:80/api-1.0.0/api/action.do";
var vm=new Vue({
	el: "#app",
	data:{
		projectName:"",
		firstName:"",
		lastName:"",
		title:"",
		telegram:"",
		email:"",
		error:false
	},
	methods: {
		submit() {
			if(!this.checkEmail()){
				return false;
			};
			axios.post(window.pcUrl, {
					actionCode: 'deployRequestInfo',
					projectName:this.projectName,
					firstName:this.firstName,
					lastName:this.lastName,
					title:this.title,
					telegram:this.telegram,
					email:this.email
				})
				.then((response) => {
					if(response.data.meta.errno == 0) {
						alert(response.data.meta.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		checkEmail() {
			if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
				this.error =true;
				return false;
			} else {
				this.error = false;
				return true;
			}
		},
	}
})