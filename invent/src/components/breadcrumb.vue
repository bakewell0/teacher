<template>
	<div class="breadcrumbs">
		{{path1}} > {{path2}}
	</div>
</template>

<script>
	export default {
		props:['path1','path2']
	}
</script>

<style>
	.breadcrumbs{
		background: #f5f5f5;
		height: 40px;
		line-height: 40px;
		margin: 0 -20px;
		padding-left: 20px;
		color:#585858;
	}
</style>