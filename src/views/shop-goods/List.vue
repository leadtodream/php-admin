<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-select
        v-model="list_query.shop_id"
        placeholder="筛选商家"
        filterable
        remote
        clearable
        :remote-method="queryShop"
      >
        <el-option v-for="i in list_shop" :key="i.id" :label="i.name" :value="i.id" />
      </el-select>
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
      <el-button-group>
        <el-button type="primary" @click="toAdd">添 加</el-button>
      </el-button-group>
    </div>
    <!-- 列表 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
      @filter-change="listFilter"
      @selection-change="listSelect"
      @sort-change="listSort"
    >
      <el-table-column label="商品" width="250">
        <template #default="scope">
          <el-avatar :src="scope.row.img" shape="square" />{{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" />
      <el-table-column label="库存" prop="stock" sortable="custom" />
      <el-table-column label="销量" prop="count_sales" sortable="custom" />
      <el-table-column label="下架" column-key="is_sale" :filters="filter_sale" :filter-multiple="false">
        <template #default="scope">
          <el-switch :value="!scope.row.is_sale" active-color="#ff4949" @change="patchSale(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="更新时间" prop="updated_at" width="160" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-edit" @click="toEdit(scope.row.id)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'
import { queryShop } from '@/assets/methods-query'

export default {
  name: 'ShopGoodsList',
  components: { Pagination },
  data() {
    return {
      api: '/admin/shops/goods',
      total: 0,
      list: [],
      list_checked: [],
      list_query: {
        page: 1,
        size: 10,
        state: '',
        keyword: '',
        shop_id: '',
        is_sale: '',
      },
      list_shop: [],
      filter_sale: [
        { text: '售卖中', value: 1 },
        { text: '已下架', value: 0 },
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
    queryShop,
    patchSale(index) {
      const item = this.list[index]
      ajax.patch(`/admin/shops/goods/${item.id}/sale`)
        .then(() => {
          this.$message.success('操作成功')
          item.is_sale = !item.is_sale
        })
    },
  },
}
</script>
