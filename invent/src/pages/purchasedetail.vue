<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="进货管理" path2="付款单打印"></v-breadcrumb>
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="100px">
				<el-form-item label="项目名称">
					<el-input v-model="purchase.proname" readonly></el-input>
				</el-form-item>
				<el-form-item label="客户名称">
					<el-input v-model="purchase.custname" readonly></el-input>
				</el-form-item>
				<el-form-item label="商品列表">
					<table border="0" cellspacing="0" cellpadding="0" class="goodsCart">
						<tr>
							<th>商品名称</th>
							<th>数量</th>
							<th>进价</th>
							<th>供应商</th>
							<th>到货情况</th>
						</tr>
						<tr v-for="(goods,index) in purchase.goodsCart">
							<td>
								<input type="text" :value="goods.name" readonly/>
							</td>
							<td>
								<input type="text" v-model="goods.quantity" readonly/>
							</td>
							<td>
								<input type="text" v-model="goods.buyprice" readonly/>
							</td>
							<td>
								<input type="text" v-model="goods.supplier" readonly/>
							</td>
							<td>
								<input type="text" v-model="goods.isget" readonly/>
							</td>
						</tr>
					</table>
				</el-form-item>
				<el-form-item label="仓库名称">
					<el-input v-model="purchase.wharehousename" readonly></el-input>
				</el-form-item>
				<el-form-item label="总价" style="color:red">
					{{purchase.sum}} 元
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
				purchase:{
					goodsCart:[]
				}
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
		},
		methods: {
			getpurchaselist(){
				api.getpurchaselist({purchaseid:this.$route.query.purchaseid})
					.then(res => {
						if(res.isSuccess){
							this.purchase=res.result[0];
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created() {
			this.getpurchaselist();
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
		height: 40px;
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