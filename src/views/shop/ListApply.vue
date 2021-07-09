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
      @selection-change="listSelect"
    >
      <el-table-column label="名称" prop="name" />
      <el-table-column label="区域">
        <template #default="scope">
          {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="address" />
      <el-table-column label="联系人" prop="contact" />
      <el-table-column label="联系电话" prop="contact_phone" />
      <el-table-column label="营业执照">
        <template #default="scope">
          <el-image :src="scope.row.img_license" :preview-src-list="[scope.row.img_license]" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="warning" size="mini" icon="el-icon-s-check" @click="patchState(scope.row.id)" />
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
import { confirmCheck } from '@/assets/methods'

export default {
  name: 'ShopListApply',
  components: { Pagination },
  data() {
    return {
      api: '/admin/shops',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
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
    patchState(id) {
      confirmCheck()
        .then(state => {
          ajax.patch(`${this.api}/${id}/state`, { state })
            .then(() => {
              this.$message.success('操作成功')
              this.getList()
            })
        })
    },
  },
}
</script>

<style scoped>
::v-deep(.el-image__inner) {
  width: 100px;
  height: 100px;
  cursor: zoom-in;
  object-fit: cover;
}
</style>
