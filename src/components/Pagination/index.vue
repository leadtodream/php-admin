<template>
  <div class="pagination-container" :hidden="total===0">
    <el-pagination
      layout="total,sizes,prev,pager,next,jumper"
      :background="true"
      :current-page="page"
      :page-sizes="[5, 10, 25, 50]"
      :page-size="size"
      :total="total"
      @current-change="changePage"
      @size-change="changeSize" />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changePage(val) {
      this.$emit('update:page', val)
      this.$emit('changed')
    },
    changeSize(val) {
      this.$emit('update:size', val)
      this.$emit('changed')
    },
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  margin-top: 10px;
  text-align: right;
}
</style>
