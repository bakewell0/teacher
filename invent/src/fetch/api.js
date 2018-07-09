import axios from 'axios';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000';

export function fetch(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export default {
	/*添加仓库*/
	addwharehouse(params) {
		return fetch('/wharehouse/add', params)
	},
	getwharehouselist(params){
		return fetch('/wharehouse/query', params)
	},
	addgoods(params){
		return fetch('/goods/add', params);
	},
	getgoodslist(params){
		return fetch('/goods/query', params);
	},
	addstaff(params){
		return fetch('/staff/add', params);
	},
	getstafflist(params){
		return fetch('/staff/query', params);
	},
	addcustomer(params){
		return fetch('/customer/add', params);
	},
	getcustomerlist(params){
		return fetch('/customer/query', params);
	},
	addsupplier(params){
		return fetch('/supplier/add', params);
	},
	getsupplierlist(params){
		return fetch('/supplier/query', params);
	},
	addprolist(params){
		return fetch('/promanage/add', params);
	},
	getprolist(params){
		return fetch('/promanage/query', params);
	},
	addaftersale(params){
		return fetch('/aftersale/add', params);
	},
	getaftersalelist(params){
		return fetch('/aftersale/query', params);
	}
}