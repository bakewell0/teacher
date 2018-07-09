<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="职员管理" path2="职员信息录入"></v-breadcrumb>
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="职员名称" prop="name">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="telephone">
					<el-input v-model="formLabelAlign.telephone"></el-input>
				</el-form-item>
				<el-form-item label="岗位" prop="duty">
					<el-input v-model="formLabelAlign.duty"></el-input>
				</el-form-item>
				<el-form-item label="身份证" prop="idcard">
					<el-input v-model="formLabelAlign.idcard"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
				<el-select v-model="formLabelAlign.gender" placeholder="请选择性别">
			      <el-option label="男" value="0"></el-option>
			      <el-option label="女" value="1"></el-option>
			    </el-select>
				</el-form-item>
				<el-form-item label="入职时间" prop="employDate">
				      <el-date-picker type="date" placeholder="入职时间" v-model="formLabelAlign.employDate" style="width: 100%;"></el-date-picker>
				</el-form-item>			
				<el-form-item label="转正时间" prop="fullDate">
				      <el-date-picker type="date" placeholder="转正时间" v-model="formLabelAlign.fullDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="家庭电话" prop="familyphone">
					<el-input v-model="formLabelAlign.familyphone"></el-input>
				</el-form-item>
				<el-form-item label="家庭住址" prop="familyaddr">
					<el-input v-model="formLabelAlign.familyaddr"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
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
				labelPosition: 'right',
				formLabelAlign: {},
				rules: {
					name: [{
						required: true,
						message: '请填写职员名称',
						trigger: 'blur'
					}],
					telephone: [{
						required: true,
						message: '请填写电话',
						trigger: 'blur'
					},
					{
						pattern:/^1[34578]\d{9}$/,
					 	message: '请输入正确的电话号码'
					}],
					duty:[{
						required: true,
						message: '请填写岗位',
						trigger: 'blur'
					}],
					idcard:[{
						required: true,
						message: '请填写身份证',
						trigger: 'blur'
					}],
					gender:[{
						required: true,
						message: '请填写性别',
						trigger: 'blur'
					}],
					employDate:[{
						required: true,
						message: '请填写入职时间',
						trigger: 'blur'
					}],
					fullDate:[{
						required: true,
						message: '请填写转正时间',
						trigger: 'blur'
					}]
				}
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.submit();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submit() {
				var data = {
					name: this.formLabelAlign.name,
					telephone: this.formLabelAlign.telephone,
					duty: this.formLabelAlign.duty,
					idcard:this.formLabelAlign.idcard,
					gender:this.formLabelAlign.gender,
					employDate:this.formLabelAlign.employDate,
					fullDate:this.formLabelAlign.fullDate,
					familyphone:this.formLabelAlign.familyphone,
					familyaddr:this.formLabelAlign.familyaddr
				}
				api.addstaff(data)
					.then(res => {
						console.log(res);
					})
					.catch(error => {
						console.log(error)
					})
			}
		}
	}
</script>

<style>
</style>