<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
    </div>
    <!-- 表格-内容 -->
    <el-table v-loading="is_loading" :data="list">
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="Query" prop="query" />
      <el-table-column label="Body">
        <template #default="scope">
          <button class="el-button el-button--success is-plain el-button--mini" @click="showBody(scope.$index)">查看</button>
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="ip" width="150" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
    <!-- 弹窗 -->
    <el-dialog v-model="is_dialog">{{ list[list_index]?.body }}</el-dialog>
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import methods from '@/assets/methods-list'

export default {
  name: 'LogCallback',
  components: { Pagination },
  data() {
    return {
      api: '/admin/logs/callback',
      total: 0,
      list: [],
      list_index: 0,
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
      },
      is_dialog: false,
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  methods: {
    ...methods,
    showBody(index) {
      this.list_index = index
      this.is_dialog = true
    },
  },
}
</script>
