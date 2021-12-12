<template>
  <el-select
    clearable
    filterable
    placeholder="筛选管理员"
    remote
    :remote-method="query"
    @change="change"
  >
    <el-option v-for="i in list" :key="i.id" :label="i.username" :value="i.id" />
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
    query(keyword) {
      ajax.get('/admin/administrators/query', { params: { keyword }})
        .then(res => this.list = res)
        .catch(() => 1)
    },
  },
}
</script>
