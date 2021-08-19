<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
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
      <el-table-column label="商家" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.img" />{{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="地区" prop="region" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="联系人" prop="contact" />
      <el-table-column label="联系电话" prop="contact_phone" />
      <el-table-column label="余额" prop="money" />
      <el-table-column label="封禁" column-key="is_ban" :filters="filer_ban" :filter-multiple="false">
        <template #default="scope">
          <el-switch v-model="scope.row.is_ban" active-color="#ff4949" @change="patchBan(scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="更新时间" prop="updated_at" width="160" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-view" @click="toDetail(scope.row.id)" />
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
  name: 'ShopList',
  components: { Pagination },
  data() {
    return {
      api: '/admin/shops',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        state: 1,
        keyword: '',
      },
      filer_ban: [
        { text: '正常', value: 0 },
        { text: '被封禁', value: 1 },
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
    patchBan(id) {
      ajax.patch(`${this.api}/${id}/ban`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },
    patchTop(id) {
      ajax.patch(`${this.api}/${id}/top`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },
  },
}
</script>
