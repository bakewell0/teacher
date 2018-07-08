<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<el-table :data="stafflist">
				<el-table-column prop="name" label="员工名称" width="180">
				</el-table-column>
				<el-table-column prop="telephone" label="电话" width="180">
				</el-table-column>
				<el-table-column prop="duty" label="岗位" width="180">
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
				stafflist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
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
			}
		},
		created(){
			this.getstafflist();
		}
	}
</script>

<style>
</style>