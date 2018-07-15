<template>
		<ul class="nav-menu">
			<li>
				<div class="option">进货管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/purchasetype">采购计划申请</router-link>					
					</li>
					<li>
						<router-link to="/purchaselist">采购计划列表</router-link>					
					</li>
				</ul>
			</li>
			<li>
				<div class="option">项目管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/protype">项目录入</router-link>
					</li>
					<li>
						<router-link to="/prolist">项目列表</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">商品管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/goodstype">商品录入</router-link>
					</li>
					<li>
						<router-link to="/goodslist">商品列表</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">职员管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/stafftype">职员信息录入</router-link>
					</li>
					<li>
						<router-link to="/stafflist">职员信息列表</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">客户管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/customertype">客户信息录入</router-link>
					</li>
					<li>
						<router-link to="/customerlist">客户信息列表</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">供应商管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/suppliertype">供应商信息录入</router-link>
					</li>
					<li>
						<router-link to="/supplierlist">供应商信息列表</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">仓库信息管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/wharehousetype">仓库信息录入</router-link>
					</li>
					<li>
						<router-link to="/wharehouselist">仓库信息列表</router-link>
					</li>
				</ul>
			</li>
			<li>
				<div class="option">售后管理</div>
				<ul class="menu-item">
					<li>
						<router-link to="/aftersaletype">售后信息录入</router-link>
					</li>
					<li>
						<router-link to="/aftersalelist">售后信息列表</router-link>
					</li>
				</ul>
			</li>
		</ul>
</template>

<script>
</script>

<style>
	@import url("../assets/css/common.css");
	.nav-menu {
		width: 189px;
		background: #f9f9f9;
		color: #585858;
		text-align: left;
		float: left;
	}
	
	.nav-menu > li {
		
	}
	
	.nav-menu li .option {
		line-height: 39px;
		height: 39px;
		padding-left: 40px;
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
	    padding: 7px 0 9px 57px;
	    margin: 0;
	    border-top: 1px dotted #e4e4e4;
	}
</style>