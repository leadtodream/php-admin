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
    <!-- 表格-内容 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
      @selection-change="listSelect"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column label="标题" prop="name" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
      <el-table-column label="更新时间" prop="updated_at" width="200" />
      <el-table-column label="操作" align="center" width="200" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-edit" @click="toEdit(scope.row.id)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <div v-show="list.length" class="table-footer">
      <el-button type="danger" size="small" plain @click="delRows">批量删除</el-button>
    </div>
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import methods from '@/assets/methods-list'

export default {
  name: 'Notice',
  components: { Pagination },
  data() {
    return {
      api: '/admin/notices',
      total: 0,
      list: [],
      list_query: {
        keyword: '',
        page: 1,
        size: 10,
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
  },
}
</script>
