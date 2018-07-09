<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="售后管理" path2="售后信息录入"></v-breadcrumb>
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="客户" prop="customerid">
					<el-select v-model="formLabelAlign.customerid" placeholder="请选择客户">
						<el-option :label="customer.name" :value="customer.id" v-for="customer in formLabelAlign.customerlist"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="保修期" prop="iswarranty">
					<el-select v-model="formLabelAlign.iswarranty" placeholder="请选择保修期内外">
						<el-option label="保修期内" value="保修期内"></el-option>
						<el-option label="保修期外" value="保修期外"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否收费" prop="ischarge">
					<el-select v-model="formLabelAlign.ischarge" placeholder="请选择是否收费">
						<el-option label="收费" value="收费"></el-option>
						<el-option label="免费" value="免费"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="故障" prop="breakdown">
					<el-input type="textarea" v-model="formLabelAlign.breakdown"></el-input>
				</el-form-item>
				<el-form-item label="售后内容" prop="aftercontent">
					<el-input type="textarea" v-model="formLabelAlign.aftercontent"></el-input>
				</el-form-item>
				<el-form-item label="收费标准" prop="price">
					<el-input type="textarea" v-model="formLabelAlign.price"></el-input>
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
					customerlist:[],
					customerid:""
				},
				rules: {
					customerid: [{
						required: true,
						message: '请选择客户',
						trigger: 'blur'
					}],
					iswarranty:[{
						required: true,
						message: '请选择保修期内外',
						trigger: 'blur'
					}],
					breakdown: [{
						required: true,
						message: '请填写故障内容',
						trigger: 'blur'
					}],
					ischarge: [{
						required: true,
						message: '请填写是否收费',
						trigger: 'blur'
					}],
					aftercontent: [{
						required: true,
						message: '请填写售后内容',
						trigger: 'blur'
					}],
					price:[{
						required: true,
						message: '请填写收费标准',
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
					customerid: this.formLabelAlign.customerid,
					iswarranty: this.formLabelAlign.iswarranty,
					breakdown: this.formLabelAlign.breakdown,
					ischarge: this.formLabelAlign.ischarge,
					aftercontent: this.formLabelAlign.aftercontent,
					price: this.formLabelAlign.price,
				}
				api.addaftersale(data)
					.then(res => {
						console.log(res);
					})
					.catch(error => {
						console.log(error)
					})
			},
			getcustomerlist(){
				var that = this;
				api.getcustomerlist()
					.then(res => {
						if(res.isSuccess) {
							that.formLabelAlign.customerlist = res.result;
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