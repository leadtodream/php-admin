<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-radio-group v-model="list_query.state">
        <el-radio label="">全部</el-radio>
        <el-radio :label="0">待受理({{ count_state0 }})</el-radio>
        <el-radio :label="3">待收货({{ count_state3 }})</el-radio>
      </el-radio-group>
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
    </div>
    <!-- 列表 -->
    <el-table
      class="table"
      ref="table"
      v-loading="is_loading"
      :data="list"
      @selection-change="listSelect"
    >
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="单号" prop="number" width="150" />
      <el-table-column label="售后商品" class-name="vertical-top" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.goods.img" shape="square" />{{ scope.row.goods.name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type_str" />
      <el-table-column label="原因" prop="reason" />
      <el-table-column label="退款金额" prop="money" />
      <el-table-column label="状态" prop="state_str" width="100" />
      <el-table-column label="创建时间" prop="created_at" width="150" />
      <el-table-column label="更新时间" prop="updated_at" width="150" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-view" @click="toDetail(scope.row.id)" />
          <el-button v-if="scope.row.state===0||scope.row.state===3" plain type="warning" size="mini" icon="el-icon-s-check" @click="showDialog(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
    <!-- 弹窗 -->
    <DialogCheckRefund ref="dialogCheckRefund" :api="api" @changed="getList" />
  </section>
</template>

<script>
import DialogCheckRefund from './components/DialogCheckRefund'
import Pagination from '@/components/Pagination'
import methods from '@/assets/methods-list'

export default {
  name: 'ShopOrderRefundList',
  components: { DialogCheckRefund, Pagination },
  data() {
    return {
      api: '/admin/shops/goods/orders/refunds',
      total: 0,
      count_state0: 0,
      count_state3: 0,
      list: [],
      list_query: {
        page: 1,
        size: 5,
        state: 0,
        keyword: '',
      },
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
    getListThen(res) { 
      this.list = res.list
      this.total = res.total
      this.count_state0 = res.count_state0
      this.count_state3 = res.count_state3
    },
    showDialog(id) {
      this.$refs.dialogCheckRefund.show(id)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-header > .el-radio-group {margin-right: 30px;}
::v-deep(.table) {
  .vertical-top {
    vertical-align: top;
  }

  /* 商品 */
  .goods {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 1em;

      >div:nth-child(3) {
        margin: 0 10px;
        font-size: 50px;
      }

      >div:last-child {line-height: 20px;}
    }

    li:last-child {margin-bottom: 0;}
  }
}

/* 商品图片 */
.goods-img {
  height: 64px;
  width: 64px;
  margin-right: 10px;
  border-radius: 4px;
  object-fit: cover;
  vertical-align: middle;
}
</style>