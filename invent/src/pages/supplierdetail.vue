<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="供应商管理" path2="供应商信息录入"></v-breadcrumb>
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="供应商名称" prop="name">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="类别" prop="category">
					<el-input v-model="formLabelAlign.category"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="linkman">
					<el-input v-model="formLabelAlign.linkman"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="telephone">
					<el-input v-model="formLabelAlign.telephone"></el-input>
				</el-form-item>
				<el-form-item label="开户行账号" prop="account">
					<el-input v-model="formLabelAlign.account"></el-input>
				</el-form-item>
				<el-form-item label="税号" prop="taxNum">
					<el-input v-model="formLabelAlign.taxNum"></el-input>
				</el-form-item>
				<el-form-item label="注册地址" prop="regAddr">
					<el-input v-model="formLabelAlign.regAddr"></el-input>
				</el-form-item>
				<el-form-item label="属性" prop="property">
					<el-input v-model="formLabelAlign.property"></el-input>
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
						message: '请填写供应商名称',
						trigger: 'blur'
					}],
					category: [{
						required: true,
						message: '请填写类别',
						trigger: 'blur'
					}],
					linkman: [{
						required: true,
						message: '请填写联系人',
						trigger: 'blur'
					}],
					telephone: [{
						required: true,
						message: '请填写电话',
						trigger: 'blur'
					}],
					account: [{
						required: true,
						message: '请填写开户行账号',
						trigger: 'blur'
					}],
					taxNum: [{
						required: true,
						message: '请填写税号',
						trigger: 'blur'
					}],
					regAddr: [{
						required: true,
						message: '请填写注册地址',
						trigger: 'blur'
					}],
					property: [{
						required: true,
						message: '请填写属性',
						trigger: 'blur'
					}],
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
					category: this.formLabelAlign.category,
					linkman: this.formLabelAlign.linkman,
					telephone: this.formLabelAlign.telephone,
					account: this.formLabelAlign.account,
					taxNum: this.formLabelAlign.taxNum,
					regAddr: this.formLabelAlign.regAddr,
					property: this.formLabelAlign.property
				}
				api.addsupplier(data)
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