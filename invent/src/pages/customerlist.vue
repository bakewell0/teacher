<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="客户管理" path2="客户信息列表"></v-breadcrumb>
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
				customerlist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
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
			},
			handleDelete(index,row){
				api.delcustomer({customerid:row.id})
					.then(res => {
						if(res.isSuccess) {
							this.getcustomerlist();
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