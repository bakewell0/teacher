<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<el-table :data="customerlist" style="width: 100%">
				<el-table-column prop="name" label="客户名称" width="180">
				</el-table-column>
				<el-table-column prop="category" label="类别" width="180">
				</el-table-column>
				<el-table-column prop="linkman" label="联系人">
				</el-table-column>
				<el-table-column prop="telephone" label="电话">
				</el-table-column>
				<el-table-column prop="taxNum" label="税号">
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
				customerlist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
		},
		methods:{
			getcustomerlist(){
				api.getcustomerlist()
					.then(res => {
						if(res.isSuccess){
							this.customerlist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created(){
			this.getcustomerlist();
		}
	}
</script>

<style>
</style>