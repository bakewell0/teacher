<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="仓库名称" prop="name">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="仓库地址" prop="addr">
					<el-input v-model="formLabelAlign.addr"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input v-model="formLabelAlign.note"></el-input>
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
				formLabelAlign: {
					name: '',
					addr: '',
					note: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请填写仓库名称',
						trigger: 'blur'
					}],
					addr: [{
						required: true,
						message: '请填写仓库地址',
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
					addr: this.formLabelAlign.addr,
					note: this.formLabelAlign.note
				}
				api.addwharehouse(data)
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