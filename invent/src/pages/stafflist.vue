<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="职员管理" path2="职员信息列表"></v-breadcrumb>
			<el-table :data="stafflist">
				<el-table-column prop="name" label="员工名称">
				</el-table-column>
				<el-table-column prop="telephone" label="电话">
				</el-table-column>
				<el-table-column prop="duty" label="岗位">
				</el-table-column>
				<el-table-column prop="idcard" label="身份证">
				</el-table-column>
				<el-table-column prop="gender" label="性别">
				</el-table-column>
				<el-table-column prop="employDate" label="入职时间">
				</el-table-column>
				<el-table-column prop="fullDate" label="转正时间">
				</el-table-column>
				<el-table-column prop="familyphone" label="家庭电话">
				</el-table-column>
				<el-table-column prop="familyaddr" label="家庭住址">
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
				stafflist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
		},
		methods:{
			getstafflist(){
				api.getstafflist()
					.then(res => {
						if(res.isSuccess){
							this.stafflist=res.result;
							this.stafflist.forEach((staff)=>{
								staff.employDate=new Date(staff.employDate).toLocaleDateString();
								staff.fullDate=new Date(staff.fullDate).toLocaleDateString();
							})
						}
					})
					.catch(error => {
						console.log(error)
				})
			},
			handleDelete(index,row){
				api.delstaff({staffid:row.id})
					.then(res => {
						if(res.isSuccess) {
							this.getstafflist();
						}
					})
					.catch(error => {
						console.log(error)
					})			
			},
		},
		created(){
			this.getstafflist();
		}
	}
</script>

<style>
</style>