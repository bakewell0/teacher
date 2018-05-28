var vm = new Vue({
	el: "#app",
	data: {
		curindex:0,
		mask:false,
		showEmail:false,
		showD:false
	},
	methods: {
		showDetail(index){
			this.curindex=index;
			this.mask = true;
		},
		unmask(){
			this.mask = false;
		},
		showE(){
			this.showEmail=true;
		},
		hideE(){
			this.showEmail=false;
		},
		showDialog(){
			this.mask = true;
			this.showD=true;
		},
		ok(){
			this.mask = false;
			this.showD=false;
		}
	},
	created: function() {

	}
})