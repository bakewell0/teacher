<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<el-table :data="supplierlist" style="width: 100%">
				<el-table-column prop="name" label="供应商名称" width="180">
				</el-table-column>
				<el-table-column prop="category" label="类别" width="180">
				</el-table-column>
				<el-table-column prop="linkman" label="联系人">
				</el-table-column>
				<el-table-column prop="telephone" label="电话">
				</el-table-column>
				<el-table-column prop="account" label="开户行账号">
				</el-table-column>
				<el-table-column prop="taxNum" label="税号">
				</el-table-column>
				<el-table-column prop="regAddr" label="注册地址">
				</el-table-column>
				<el-table-column prop="property" label="属性">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import nav from '../components/nav';
	import top from '../components/top';
	import api from '../fetch/api'
	export default {
		data() {
			return {
				supplierlist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
		},
		methods:{
			getsupplierlist(){
				api.getsupplierlist()
					.then(res => {
						if(res.isSuccess){
							this.supplierlist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created(){
			this.getsupplierlist();
		}
	}
</script>

<style>
</style>