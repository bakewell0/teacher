<template>
	<div class="container">
		<v-top></v-top>
		<div class="both">
		<v-nav></v-nav>
		<div class="content">
			<v-breadcrumb path1="售后管理" path2="售后信息列表"></v-breadcrumb>
			<el-table :data="aftersalelist" style="width: 100%">
				<el-table-column prop="name" label="客户名称" width="180">
				</el-table-column>
				<el-table-column prop="linkman" label="联系人" width="180">
				</el-table-column>
				<el-table-column prop="telephone" label="电话" width="180">
				</el-table-column>
				<el-table-column prop="iswarranty" label="保修期内外" width="180">
				</el-table-column>
				<el-table-column prop="ischarge" label="是否收费">
				</el-table-column>
				<el-table-column prop="breakdown" label="故障">
				</el-table-column>
				<el-table-column prop="aftercontent" label="售后内容">
				</el-table-column>
				<el-table-column prop="price" label="收费标准">
				</el-table-column>
			</el-table>
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
				aftersalelist:[]
			}
		},
		components: {
			'v-nav': nav,
			'v-top': top,
			'v-breadcrumb':breadcrumb
		},
		methods:{
			getaftersalelist(){
				api.getaftersalelist()
					.then(res => {
						if(res.isSuccess){
							this.aftersalelist=res.result;
						}
					})
					.catch(error => {
						console.log(error)
				})
			}
		},
		created(){
			this.getaftersalelist();
		}
	}
</script>

<style>

</style>