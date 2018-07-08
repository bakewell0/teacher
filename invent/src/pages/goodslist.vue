<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<el-table :data="goodslist" style="width: 100%">
				<el-table-column prop="name" label="商品名称" width="180">
				</el-table-column>
				<el-table-column prop="category" label="商品类别" width="180">
				</el-table-column>
				<el-table-column prop="brand" label="品牌">
				</el-table-column>
				<el-table-column prop="model" label="型号">
				</el-table-column>
				<el-table-column prop="specific" label="规格">
				</el-table-column>
				<el-table-column prop="supplier" label="供应商名称">
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
				goodslist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
		},
		methods:{
			getgoodslist(){
				api.getgoodslist()
					.then(res => {
						if(res.isSuccess){
							this.goodslist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created(){
			this.getgoodslist();
		}
	}
</script>

<style>
</style>