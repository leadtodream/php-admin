<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <SelectQueryUser v-model="list_query.user_id" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
    </div>
    <!-- 表格-内容 -->
    <el-table v-loading="is_loading" :data="list">
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="用户" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.user.img" />{{ scope.row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="ip" width="150" />
      <el-table-column label="代理" prop="agent" />
      <el-table-column label="登录时间" prop="created_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectQueryUser from '@/components/SelectQuery/User'
import methods from '@/assets/methods-list'

export default {
  name: 'LogIn',
  components: { Pagination, SelectQueryUser },
  data() {
    return {
      api: '/admin/logs/in',
      total: 0,
      list: [],
      list_query: {
        keyword: '',
        page: 1,
        size: 10,
        user_id: '',
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
