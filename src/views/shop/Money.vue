<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <SelectQueryShop v-model="list_query.shop_id" />
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
      <el-table-column label="商家" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.shop.img" />{{ scope.row.shop.name }}
        </template>
      </el-table-column>
      <el-table-column label="金额" width="200">
        <template #default="scope">
          <span v-if="scope.row.money>0" class="color-success font-bold">+{{ scope.row.money }}</span>
          <span v-else class="color-danger font-bold">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结余" prop="balance" width="200" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectQueryShop from '@/components/SelectQuery/Shop'
import methods from '@/assets/methods-list'

export default {
  name: 'ShopMoney',
  components: { Pagination, SelectQueryShop },
  data() {
    return {
      api: '/admin/shops/money',
      total: 0,
      list: [],
      list_query: {
        date: '',
        keyword: '',
        page: 1,
        shop_id: '',
        size: 10,
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
        filename: '商家余额明细',
        column: {
          shop_name: '商家',
          money: '金额',
          balance: '结余',
          remark: '备注',
          created_at: '创建时间',
        },
      })
    },
  },
}
</script>
