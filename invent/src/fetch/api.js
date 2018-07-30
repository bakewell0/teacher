import axios from 'axios';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://47.99.44.43:3000';

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
	delwharehouse(params){
		return fetch('/wharehouse/delete', params)
	},
	addgoods(params){
		return fetch('/goods/add', params);
	},
	getgoodslist(params){
		return fetch('/goods/query', params);
	},
	delgoods(params){
		return fetch('/goods/delete', params);
	},
	addstaff(params){
		return fetch('/staff/add', params);
	},
	getstafflist(params){
		return fetch('/staff/query', params);
	},
	delstaff(params){
		return fetch('/staff/delete', params);
	},
	addcustomer(params){
		return fetch('/customer/add', params);
	},
	getcustomerlist(params){
		return fetch('/customer/query', params);
	},
	delcustomer(params){
		return fetch('/customer/delete', params);
	},
	addsupplier(params){
		return fetch('/supplier/add', params);
	},
	getsupplierlist(params){
		return fetch('/supplier/query', params);
	},
	delsupplier(params){
		return fetch('/supplier/delete', params);
	},
	addprolist(params){
		return fetch('/promanage/add', params);
	},
	getprolist(params){
		return fetch('/promanage/query', params);
	},
	delpro(params){
		return fetch('/promanage/delete', params);
	},
	addaftersale(params){
		return fetch('/aftersale/add', params);
	},
	getaftersalelist(params){
		return fetch('/aftersale/query', params);
	},
	delaftersale(params){
		return fetch('/aftersale/delete', params);
	},
	addpurchase(params){
		return fetch('/purchase/add', params);
	},
	getpurchaselist(params){
		return fetch('/purchase/query', params);
	},
	delpurchase(params){
		return fetch('/purchase/delete', params);
	}
}