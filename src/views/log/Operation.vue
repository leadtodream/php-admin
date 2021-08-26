<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <SelectQueryAdministrator v-model="list_query.administrator_id" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
    </div>
    <!-- 表格-内容 -->
    <el-table v-loading="is_loading" :data="list">
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="管理员" prop="administrator.username" width="200" />
      <el-table-column label="模型" prop="model" width="200" />
      <el-table-column label="模型ID" prop="model_id" width="120" />
      <el-table-column label="内容" prop="content" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectQueryAdministrator from '@/components/SelectQuery/Administrator'
import methods from '@/assets/methods-list'

export default {
  name: 'LogOperation',
  components: { Pagination, SelectQueryAdministrator },
  data() {
    return {
      api: '/admin/logs/operation',
      total: 0,
      list: [],
      list_query: {
        keyword: '',
        page: 1,
        size: 10,
        administrator_id: '',
      },
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  methods: {
    ...methods,
  },
}
</script>
