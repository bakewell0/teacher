<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="仓库管理" path2="仓库信息列表"></v-breadcrumb>
			<el-table :data="wharehouselist" style="width: 100%">
				<el-table-column prop="name" label="仓库名称" width="180">
				</el-table-column>
				<el-table-column prop="addr" label="仓库地址" width="180">
				</el-table-column>
				<el-table-column prop="note" label="备注">
				</el-table-column>
				<el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
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
				wharehouselist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
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
			},
			handleDelete(index,row){
				api.delwharehouse({wharehouseid:row.id})
					.then(res => {
						if(res.isSuccess) {
							this.getwharehouselist();
						}
					})
					.catch(error => {
						console.log(error)
					})			
			},
		},
		created(){
			this.getwharehouselist();
		}
	}
</script>

<style>

</style>