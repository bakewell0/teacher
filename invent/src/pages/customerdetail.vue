<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="客户名称" prop="name">
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
				<el-form-item label="税号" prop="taxNum">
					<el-input v-model="formLabelAlign.taxNum"></el-input>
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
</template>

<script>
	import nav from '../components/nav';
	import top from '../components/top';
	import api from '../fetch/api'
	export default {
		data() {
			return {
				labelPosition: 'right',
				formLabelAlign: {},
				rules: {
					name: [{
						required: true,
						message: '请填写仓库名称',
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
					taxNum: [{
						required: true,
						message: '请填写税号',
						trigger: 'blur'
					}],
					property: [{
						required: true,
						message: '请填写属性',
						trigger: 'blur'
					}]
				}
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top
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
					taxNum: this.formLabelAlign.taxNum,
					property: this.formLabelAlign.property				
				}
				api.addcustomer(data)
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