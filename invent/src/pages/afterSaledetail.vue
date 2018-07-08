<template>
	<div>
		<v-top></v-top>
		<v-nav></v-nav>
		<div class="content"></div>
	</div>
</template>

<script>
	import top from '../components/top';
	import nav from '../components/nav';
	export default {
		components:{
			'v-top': top,
			'v-nav': nav
		},
		methods: {
			
		}
	}
</script>

<style>
</style>