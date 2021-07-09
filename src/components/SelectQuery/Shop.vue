<template>
  <el-select
		clearable
		filterable
		placeholder="筛选商家"
		remote
		:remote-method="queryShop"
		@change="change"
	>
		<el-option v-for="i in list" :key="i.id" :label="i.name" :value="i.id" />
	</el-select>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
	data() {
		return {
			list: [],
		}
	},
	props: {
    value: String,
	},
	methods: {
		change(e) {
			this.$emit('input', e)
		},
		queryShop(keyword) {
			ajax.get('/admin/shops/query', { params: { keyword }})
				.then(res => this.list = res)
				.catch(() => 1)
		},
	},
}
</script>
