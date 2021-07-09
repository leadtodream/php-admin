<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-select
        v-model="list_query.coupon_id"
        placeholder="筛选优惠券"
        filterable
        remote
        clearable
        :remote-method="queryCoupon"
      >
        <el-option v-for="i in list_coupon" :key="i.id" :label="i.name" :value="i.id" />
      </el-select>
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
    </div>
    <!-- 列表 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
      @filter-change="listFilter"
    >
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="优惠券" prop="coupon.name" />
      <el-table-column label="用户">
        <template #default="scope">
          <el-avatar :src="scope.row.user.img" />{{ scope.row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state_str" column-key="state" :filters="filter_state" :filter-multiple="false" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
      <el-table-column label="更新时间" prop="updated_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'

export default {
  name: 'CouponIssued',
  components: { Pagination },
  data() {
    return {
      api: '/admin/users/coupons',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        state: '',
        coupon_id: '',
      },
      list_coupon: [],
      filter_state: [
        { text: '待使用', value: 0 },
        { text: '已使用', value: 1 },
        { text: '已失效', value: -1 },
      ],
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
    queryCoupon(keyword) {
      ajax.get('/admin/coupons/query', { params: { keyword }})
        .then(res => {
          this.list_coupon = res
        })
    },
  },
}
</script>
