var vm = new Vue({
	el: "#container",
	data: {
		email: "",
		error: false
	},
	methods: {
		submit() {
			if(!this.checkout()) {
				return false;
			}
			axios.post(window.reqUrl, {
					actionCode: 'mailCollect',
					email: this.email
				})
				.then(function(response) {
					swal(response.data.meta.msg);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		checkout() {
			if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
				this.error =true;
				return false;
			} else {
				this.error = false;
				return true;
			}
		}
	},

	created: function() {

	}
})