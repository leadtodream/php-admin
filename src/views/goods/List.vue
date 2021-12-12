<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-select v-model="list_query.state">
        <el-option label="全部" value="" />
        <el-option label="销售中" value="1" />
        <el-option label="已下架" value="0" />
        <el-option label="已告罄" value="2" />
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
      <el-table-column type="selection" width="55" />
      <el-table-column label="商品" width="250">
        <template #default="scope">
          <el-avatar :src="scope.row.img" shape="square" />{{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" />
      <el-table-column label="库存" prop="stock" sortable="custom" />
      <el-table-column label="销量" prop="sale" sortable="custom" />
      <el-table-column label="状态" prop="state_str" />
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
    <div v-show="list.length" class="table-footer">
      <el-button type="success" size="mini" plain @click="multiOn">上架</el-button>
      <el-button type="warning" size="mini" plain @click="multiOff">下架</el-button>
      <el-button type="danger" size="mini" plain @click="multiDel">删除</el-button>
    </div>
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'

export default {
  name: 'GoodsList',
  components: { Pagination },
  data() {
    return {
      api: '/admin/goods',
      is_loading: false,
      list: [],
      list_checked: [],
      list_query: {
        keyword: '',
        page: 1,
        size: 10,
        sort: '',
        state: '',
      },
      total: 0,
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
    multiDel() {
      this.patchState('multi-del')
    },
    multiOff() {
      this.patchState('multi-off')
    },
    multiOn() {
      this.patchState('multi-on')
    },
    patchState(action) {
      if (!this.list_checked.length) {
        return this.$message.error('请选择操作项')
      }

      ajax.patch(`${this.api}/${action}`, { ids: this.list_checked })
        .then(() => {
          this.$message.success('操作成功')
          this.getList()
        })
        .catch(() => 1)
    },
  },
}
</script>
