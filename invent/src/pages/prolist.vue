<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<el-table :data="prolist" style="width: 100%">
				<el-table-column prop="proname" label="项目名称" width="180">
				</el-table-column>
				<el-table-column prop="custname" label="客户名称" width="180">
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
				prolist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
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