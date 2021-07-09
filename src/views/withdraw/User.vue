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
        <el-button plain type="info" :loading="is_export" @click="exportList">导 出</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
      @filter-change="listFilter"
    >
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="用户" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.user.img" />{{ scope.row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="提现方式" prop="channel_str" column-key="channel" :filters="filer_channel" :filter-multiple="false" />
      <el-table-column label="提现金额" prop="money" />
      <el-table-column label="手续费" prop="money_service" />
      <el-table-column label="到账金额" prop="money_arrived" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="状态" prop="state_str" column-key="state" :filters="filer_state" :filter-multiple="false" />
      <el-table-column label="申请时间" prop="created_at" width="160" />
      <el-table-column label="审核时间" prop="updated_at" width="160" />
      <el-table-column label="操作" align="center" width="100" class-name="table-column-action">
        <template #default="scope">
          <el-button v-if="!scope.row.state" plain type="warning" size="mini" icon="el-icon-s-check" @click="showDialogCheck(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <Pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
    <!-- 弹窗 -->
    <DialogCheck ref="dialogCheck" :api="api" @changed="getList" />
  </section>
</template>

<script>
import DialogCheck from './components/DialogCheck'
import Pagination from '@/components/Pagination'
import SelectQueryUser from '@/components/SelectQuery/User'
import methods from '@/assets/methods-list'

export default {
  name: 'WithdrawUser',
  components: { DialogCheck, Pagination, SelectQueryUser },
  data() {
    return {
      api: '/admin/users/withdraw',
      total: 0,
      list: [],
      list_query: {
        channel: '',
        date: '',
        keyword: '',
        page: 1,
        size: 10,
        state: '',
        user_id: '',
      },
      filer_channel: [
        { text: '微信', value: 'weixin' },
        { text: '支付宝', value: 'alipay' },
        { text: '线下打款', value: 'cash' },
      ],
      filer_state: [
        { text: '待审核', value: 0 },
        { text: '成功', value: 1 },
        { text: '驳回', value: -1 },
      ],
      is_export: false,
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  activated() {
    this.getList()
  },
  methods: {
    ...methods,
    exportList() {
      this.list2xlsx({
        filename: '用户提现记录',
        column: {
          user_nickname: '用户',
          channel_str: '提现方式',
          money: '提现金额',
          money_service: '手续费',
          money_arrived: '到账金额',
          state_str: '状态',
          remark: '备注',
          created_at: '申请时间',
          updated_at: '审核时间',
        },
      })
    },
    showDialogCheck(id) {
      this.$refs['dialogCheck'].show(id)
    },
  },
}
</script>
