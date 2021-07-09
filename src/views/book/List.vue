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
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="国籍" prop="nation" />
      <el-table-column label="颜色">
        <template #default="scope">
          <div class="color" :style="`height:28px;background:${scope.row.color};`"></div>
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
    <div v-show="list.length" class="table-footer">
      <el-button type="danger" size="small" plain @click="delRows">批量删除</el-button>
    </div>
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import methods from '@/assets/methods-list'

export default {
  name: 'BookList',
  components: { Pagination },
  data() {
    return {
      api: '/admin/books',
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
  },
}
</script>
