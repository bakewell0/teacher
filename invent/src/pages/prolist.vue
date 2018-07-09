<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="项目管理" path2="项目列表"></v-breadcrumb>
			<el-table :data="prolist" style="width: 100%">
				<el-table-column prop="proname" label="项目名称" width="180">
				</el-table-column>
				<el-table-column prop="custname" label="客户名称" width="180">
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
				prolist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
		},
		methods:{
			getprolist(){
				api.getprolist()
					.then(res => {
						if(res.isSuccess){
							this.prolist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created(){
			this.getprolist();
		}
	}
</script>

<style>

</style>