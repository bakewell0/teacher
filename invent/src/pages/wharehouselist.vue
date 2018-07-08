<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<el-table :data="wharehouselist" style="width: 100%">
				<el-table-column prop="name" label="仓库名称" width="180">
				</el-table-column>
				<el-table-column prop="addr" label="仓库地址" width="180">
				</el-table-column>
				<el-table-column prop="note" label="备注">
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
				wharehouselist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
		},
		methods:{
			getwharehouselist(){
				api.getwharehouselist()
					.then(res => {
						if(res.isSuccess){
							this.wharehouselist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created(){
			this.getwharehouselist();
		}
	}
</script>

<style>

</style>