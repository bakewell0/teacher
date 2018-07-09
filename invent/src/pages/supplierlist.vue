<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
			<v-nav></v-nav>
			<div class="content">
				<v-breadcrumb path1="供应商管理" path2="供应商信息列表"></v-breadcrumb>
				<el-table :data="supplierlist">
					<el-table-column prop="name" label="供应商名称" width="200px">
					</el-table-column>
					<el-table-column prop="category" label="类别" width="200px">
					</el-table-column>
					<el-table-column prop="linkman" label="联系人" width="200px">
					</el-table-column>
					<el-table-column prop="telephone" label="电话" width="200px">
					</el-table-column>
					<el-table-column prop="account" label="开户行账号" width="220px">
					</el-table-column>
					<el-table-column prop="taxNum" label="税号" width="200px">
					</el-table-column>
					<el-table-column prop="regAddr" label="注册地址" width="200px">
					</el-table-column>
					<el-table-column prop="property" label="属性" width="200px">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import nav from '../components/nav';
	import top from '../components/top';
	import api from '../fetch/api';
	import breadcrumb from '../components/breadcrumb'
	export default {
		data() {
			return {
				supplierlist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
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