<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-radio-group v-model="list_query.state">
        <el-radio label="">全部</el-radio>
        <el-radio :label="0">待付款({{ count_state0 }})</el-radio>
        <el-radio :label="1">待发货({{ count_state1 }})</el-radio>
        <el-radio :label="2">待收货</el-radio>
        <el-radio :label="3">已完成</el-radio>
        <el-radio :label="-1">已取消</el-radio>
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
      <el-table-column label="订单号" prop="number" width="120" />
      <el-table-column label="商品" class-name="vertical-top" width="400">
        <template #default="scope">
          <ul class="goods">
            <li v-for="i in scope.row.packages" :key="i.id">
              <img class="goods-img" :src="i.img">
              <div>{{ i.name }}</div>
              <div>{</div>
              <div>规格：{{ i.sku||'-' }}<br>单价：¥{{ i.price }}<br>数量：{{ i.quantity }}</div>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="实收款">
        <template #default="scope">
          ￥{{ scope.row.money_pay }}
        </template>
      </el-table-column>
      <el-table-column label="买家" class-name="vertical-top">
        <template #default="scope">
          {{ scope.row.user.nickname }}
          <div v-if="scope.row.note_customer">
            <span class="color-gray">留言：</span>{{ scope.row.note_customer }}
          </div>
          <div class="note-merchant">
            <span class="color-gray">备注：</span>{{ scope.row.note_merchant }}
            <i class="el-icon-edit" @click="editNote(scope.$index)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state_str" width="100" />
      <el-table-column label="创建时间" prop="created_at" width="150" />
      <el-table-column label="更新时间" prop="updated_at" width="150" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-view" @click="toDetail(scope.row.id)" />
          <el-button v-if="scope.row.state===1" plain type="success" size="mini" @click="showDialogDelivery(scope.$index)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
    <!-- 弹窗 -->
    <DialogDelivery ref="dialogDelivery" :api="api" @changed="getList" />
  </section>
</template>

<script>
import DialogDelivery from './components/DialogDelivery'
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'

export default {
  name: 'ShopOrderList',
  components: { DialogDelivery, Pagination },
  data() {
    return {
      api: '/admin/shops/goods/orders',
      total: 0,
      count_state0: 0,
      count_state1: 0,
      list: [],
      list_query: {
        keyword: '',
        page: 1,
        size: 5,
        state: '',
      },
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  activated() {
    const params = this.$store.state.routeParams
    if (params) {
      this.list_query.state = params.state
      this.$store.commit('setRouteParams')
    }
    this.getList()
  },
  methods: {
    ...methods,
    editNote(index) {
      const item = this.list[index]
      this.$prompt('', '备注信息', {
        inputType: 'textarea',
        inputValue: item.note_merchant,
      }).then(res => {
        this.patchNote(index, res.value)
      }).catch(() => 1)
    },
    getListThen(res) {
      this.list = res.list
      this.total = res.total
      this.count_state0 = res.count_state0
      this.count_state1 = res.count_state1
    },
    patchNote(index, note) {
      const item = this.list[index]
      ajax.patch(`${this.api}/${item.id}/note`, { note })
        .then(() => {
          this.$message.success('修改成功')
          item.note_merchant = note
        })
    },
    showDialogDelivery(index) {
      const item = this.list[index]
      this.$refs['dialogDelivery'].show(item.id, item.delivery_address)
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

  /* 备注 */
  .note-merchant {
    margin-top: 5px;
    line-height: normal;

    i {
      color: #409EFF;
      cursor: pointer;
    }
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