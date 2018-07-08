<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content">
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
				<el-form-item label="项目名称" prop="proname">
					<el-input v-model="formLabelAlign.proname"></el-input>
				</el-form-item>
				<el-form-item label="客户名称" prop="custname">
					<el-select v-model="formLabelAlign.custname" placeholder="请选择客户">
						<el-option :label="customer.name" :value="customer.name" v-for="customer in formLabelAlign.customerlist"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="添加货物">
					<el-select v-model="formLabelAlign.curgoods" placeholder="请选择货物" @change="addgoods">
						<el-option :label="goods.name" :value="goods.name" v-for="goods in formLabelAlign.goodslist"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="货物列表" prop="goodsCart">
					<table border="0" cellspacing="0" cellpadding="0" class="goodsCart">
						<tr>
							<th>货物名称</th>
							<th>数量</th>
							<th>进价</th>
							<th>售价</th>
							<th>供应商</th>
							<th>到货情况</th>
							<th>操作</th>
						</tr>
						<tr v-if="formLabelAlign.goodsCart.length==0">
							没有可显示的数据记录
						</tr>
						<tr v-for="(goods,index) in formLabelAlign.goodsCart">
							<td>
								<input type="text" :value="goods.name" />
							</td>
							<td>
								<input type="text" v-model="goods.quantity" />
							</td>
							<td>
								<input type="text" v-model="goods.buyprice" />
							</td>
							<td>
								<input type="text" v-model="goods.sellprice" />
							</td>
							<td>
								<input type="text" v-model="goods.supplier" />
							</td>
							<td>
								<input type="text" v-model="goods.isget" />
							</td>
							<td>
								<input type="button" value="删除" class="del" @click="del(index)"/>								
							</td>
						</tr>
					</table>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>

			<!--proname:Sequelize.STRING,//项目名称
			custname:Sequelize.STRING,//客户名称
			goodsList:Sequelize.STRING,//货物清单,数组-->

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
					proname:"",//项目名称
					custname:"",//所选客户名称
					customerlist:[],//客户列表
					curgoods: {},//所选商品
					goodslist: [],//商品列表
					goodsCart: []//货物清单
				},
				rules: {
					proname: [{
						required: true,
						message: '请填写项目名称',
						trigger: 'blur'
					}],
					custname: [{
						required: true,
						message: '请填写客户名称',
						trigger: 'blur'
					}],
					goodsCart:[{
						required: true,
						message: '请添加货物',
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
					proname: this.formLabelAlign.proname,
					custname: this.formLabelAlign.custname,
					goodsCart: this.formLabelAlign.goodsCart
				}
				api.addprolist(data)
					.then(res => {
						console.log(res);
					})
					.catch(error => {
						console.log(error)
					})
			},
			getgoodslist() {
				var that = this;
				api.getgoodslist()
					.then(res => {
						if(res.isSuccess) {
							that.formLabelAlign.goodslist = res.result;
						}
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
			},
			addgoods() {
				if(!this.isrepeat()) {
					var goodsitem={
						name:this.formLabelAlign.curgoods,
						supplier:this.getgoodsbyname(this.formLabelAlign.curgoods).supplier//供应商
					};
					this.formLabelAlign.goodsCart.push(goodsitem);
				} else {
					alert("此货物已添加");
				}
			},
			getgoodsbyname(name){
				var g={};
				this.formLabelAlign.goodslist.forEach((goods)=>{
					if(goods.name==name){
						g=goods;
					}
				})
				return g;
			},
			isrepeat() {
				var isrepeat = false;
				var that = this;
				this.formLabelAlign.goodsCart.forEach((goods) => {
					if(goods.name == that.formLabelAlign.curgoods) {
						isrepeat = true;
					}
				})
				return isrepeat;
			},
			del(index){
				this.formLabelAlign.goodsCart.splice(index, 1)
			}
		},
		created() {
			this.getgoodslist();
			this.getcustomerlist();
		}
	}
</script>

<style>
	.goodsCart{}
	.goodsCart td{
		border-top:1px #dcdfe6 solid
	}
	.goodsCart tr:nth-last-child(1) td{
		border-bottom: 1px #dcdfe6 solid;
	}
	.goodsCart tr th,.goodsCart tr td{
		height: 50px;
		width: 170px;
		text-align: center;
	}
	.goodsCart tr td input{
		height: 30px;
		text-align: center;
		border:0
	}
	.goodsCart tr td{
		border-left: 1px #dcdfe6 solid;
	}
	.goodsCart tr td:nth-last-child(1){
		border-right: 1px #dcdfe6 solid;
	}
	.del{
		width: 56px;
		text-align: center;
		line-height: 28px;
		background: #f56c6c;
		color:white;
		font-size: 12px;
    	border-radius: 3px;
    	cursor: pointer;
	}
</style>