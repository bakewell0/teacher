<template>
	<div>
		<div class="nav-top">
			aaa
		</div>
		<ul class="nav-menu">
			<li>
				<div class="option">进货管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/purchasedetail">采购计划申请</router-link>					
					</li>
					<li>
						<router-link to="/purchaselist">采购计划列表</router-link>					
					</li>
					<li>
						<router-link to="/purchasedetail">付款单打印</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">项目管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/prodetail">项目录入</router-link>
					</li>
					<li>
						<router-link to="/prolist">项目列表</router-link>
					</li>
					<li>
						<router-link to="/prodetail">项目详情</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">商品管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/goodsdetail">商品录入</router-link>
					</li>
					<li>
						<router-link to="/goodslist">商品列表</router-link>
					</li>
					<li>
						<router-link to="/goodsdetail">商品详情</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">职员管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/staffdetail">职员信息录入</router-link>
					</li>
					<li>
						<router-link to="/stafflist">职员信息列表</router-link>
					</li>
					<li>
						<router-link to="/staffdetail">职员信息详情</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">客户管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/customerdetail">客户信息录入</router-link>
					</li>
					<li>
						<router-link to="/customerlist">客户信息列表</router-link>
					</li>
					<li>
						<router-link to="/customerdetail">客户信息详情</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">供应商管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/supplierdetail">供应商信息录入</router-link>
					</li>
					<li>
						<router-link to="/supplierlist">供应商信息列表</router-link>
					</li>
					<li>
						<router-link to="/supplierdetail">供应商信息详情</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">仓库信息管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/wharehousedetail">仓库信息录入</router-link>
					</li>
					<li>
						<router-link to="/wharehouselist">仓库信息列表</router-link>
					</li>
					<li>
						<router-link to="/wharehousedetail">仓库信息详情</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">售后管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/afterSalelist">111</router-link>
					</li>
					<li>
						<router-link to="/afterSaledetail">222</router-link>
					</li>
				</ul>
			</li>
		</ul>
		<div class="content">

		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	@import url("../assets/css/common.css");
	.nav-top{
		width: 100%;
		height: 45px;
		background: #438eb9;
		color:white;
		line-height: 45px;
		padding-left: 5px;
		box-sizing: border-box;
	}
	
	.nav-menu {
		width: 189px;
		background: #f9f9f9;
		color: #585858;
		text-align: center;
	}
	
	.nav-menu > li {
		
	}
	
	.nav-menu li .option {
		line-height: 39px;
		height: 39px;
	}
	
	.nav-menu li .menu-item {
		display: none;
		background: white;
	}
	
	.nav-menu li:hover .menu-item {
		display: block;
	}
	
	.menu-item li {}
	
	.menu-item li a {
		display: block;
	    position: relative;
	    color: #616161;
	    padding: 7px 0 9px 37px;
	    margin: 0;
	    border-top: 1px dotted #e4e4e4;
	}
</style>