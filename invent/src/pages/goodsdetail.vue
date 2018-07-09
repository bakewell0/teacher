<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="商品管理" path2="商品录入"></v-breadcrumb>
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="商品类别" prop="category">
					<el-input v-model="formLabelAlign.category"></el-input>
				</el-form-item>
				<el-form-item label="品牌" prop="brand">
					<el-input v-model="formLabelAlign.brand"></el-input>
				</el-form-item>
				<el-form-item label="型号" prop="model">
					<el-input v-model="formLabelAlign.model"></el-input>
				</el-form-item>
				<el-form-item label="规格" prop="specific">
					<el-input v-model="formLabelAlign.specific"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称" prop="supplier">
					<el-input v-model="formLabelAlign.supplier"></el-input>
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
				formLabelAlign: {
					name: '',
					category: '',
					brand: '',
					model: '',
					specific: '',
					supplier: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请填写商品名称',
						trigger: 'blur'
					}],
					category: [{
						required: true,
						message: '请填写商品类别',
						trigger: 'blur'
					}],
					brand: [{
						required: true,
						message: '请填写商品类别',
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: '请填写商品类别',
						trigger: 'blur'
					}],
					specific: [{
						required: true,
						message: '请填写商品类别',
						trigger: 'blur'
					}],
					supplier: [{
						required: true,
						message: '请填写商品类别',
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
					category: this.formLabelAlign.category,
					brand: this.formLabelAlign.brand,
					model: this.formLabelAlign.model,
					specific: this.formLabelAlign.specific,
					supplier: this.formLabelAlign.supplier
				}
				api.addgoods(data)
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