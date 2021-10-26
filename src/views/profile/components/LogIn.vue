<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="item of list" :key="item.id" :timestamp="item.created_at" placement="top">
        <span>IP地址：{{ item.ip }}</span>
        <el-tag size="mini" type="success">{{ item.platform }}</el-tag>
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      ajax.get('/admin/logs/in', { params: { size: 10 }})
        .then(res => {
          this.list = [...res.list]
        })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep(.el-tag) {
  margin-left: 10px;
}
</style>
