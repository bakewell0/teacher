<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="进货管理" path2="采购列表"></v-breadcrumb>
			<el-table :data="purchaselist" style="width: 100%">
				<el-table-column prop="proname" label="项目名称">
				</el-table-column>
				<el-table-column prop="custname" label="客户名称">
				</el-table-column>
				<el-table-column prop="wharehousename" label="仓库名称">
				</el-table-column>
				<el-table-column prop="sum" label="总价">
				</el-table-column>
				<el-table-column label="操作">
			      <template slot-scope="scope">
			      	<el-button
			          size="mini"
			          @click="handleLook(scope.$index, scope.row)">查看</el-button>
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
				purchaselist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
		},
		methods:{
			getpurchaselist(){
				api.getpurchaselist()
					.then(res => {
						if(res.isSuccess){
							this.purchaselist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			},
			handleDelete(index,row){
				api.delpurchase({purchaseid:row.id})
					.then(res => {
						if(res.isSuccess) {
							this.getpurchaselist();
						}
					})
					.catch(error => {
						console.log(error)
					})			
			},
			handleLook(index,row){
				this.$router.push({ path: '/purchasedetail',query:{purchaseid:row.id}});
			},
			handleEdit(index,row){
				
			}
		},
		created(){
			this.getpurchaselist();
		}
	}
</script>

<style>

</style>