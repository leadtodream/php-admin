<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <SelectQueryUser v-model="list_query.user_id" />
      <el-date-picker v-model="list_query.date" type="daterange" start-placeholder="筛选日期" value-format="YYYY-MM-DD" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
      <div class="right">
        <el-button plain type="info" v-loading="is_export" @click="exportList">导 出</el-button>
      </div>
    </div>
    <!-- 表格-内容 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
    >
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="用户" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.user.img" />{{ scope.row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="数量" width="200">
        <template #default="scope">
          <span v-if="scope.row.point>0" class="color-success font-bold">+{{ scope.row.point }}</span>
          <span v-else class="color-danger font-bold">{{ scope.row.point }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结余" prop="balance" width="200" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectQueryUser from '@/components/SelectQuery/User'
import methods from '@/assets/methods-list'

export default {
  name: 'UserPoint',
  components: { Pagination, SelectQueryUser },
  data() {
    return {
      api: '/admin/users/points',
      total: 0,
      list: [],
      list_query: {
        date: '',
        keyword: '',
        page: 1,
        size: 10,
        user_id: '',
      },
      is_export: false,
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  methods: {
    ...methods,
    exportList() {
      this.list2xlsx({
        filename: '用户积分明细',
        column: {
          user_nickname: '用户',
          point: '数量',
          balance: '结余',
          remark: '备注',
          created_at: '创建时间',
        },
      })
    },
  },
}
</script>
