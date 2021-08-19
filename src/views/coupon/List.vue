<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
      <el-button-group>
        <el-button type="primary" @click="toAdd">添 加</el-button>
      </el-button-group>
    </div>
    <!-- 列表 -->
    <el-table v-loading="is_loading" :data="list">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="类型" prop="type_str" />
      <el-table-column label="数量" prop="quantity" />
      <el-table-column label="限领" prop="quantity_unit" />
      <el-table-column label="已领取" prop="quantity_received" />
      <el-table-column label="已使用" prop="quantity_used" />
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="更新时间" prop="updated_at" width="160" />
      <el-table-column label="操作" align="center" width="170" class-name="table-column-action">
        <template #default="scope">
          <el-button v-if="!scope.row.state" plain type="success" size="mini" @click="patchState(scope.$index, 1)">激活</el-button>
          <el-button v-if="!scope.row.state" plain type="info" size="mini" icon="el-icon-edit" @click="toEdit(scope.row.id)" />
          <el-button v-if="scope.row.state===1" plain type="warning" size="mini" @click="patchState(scope.$index, -1)">作废</el-button>
          <el-button v-if="scope.row.state!==1" plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'

export default {
  name: 'CouponList',
  components: { Pagination },
  data() {
    return {
      api: '/admin/coupons',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        state: '',
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
    patchState(index, state) {
      const item = this.list[index]

      ajax.patch(`${this.api}/${item.id}/state`, { state })
        .then(() => {
          this.$message.success('操作成功')
          item.state = state
        })
    },
  },
}
</script>
