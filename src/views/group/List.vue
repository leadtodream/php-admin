<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
      <el-button-group>
        <el-button type="primary" @click="showDialogGroupForm(null)">添 加</el-button>
      </el-button-group>
    </div>
    <!-- 表格-内容 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
    >
      <el-table-column label="名称" prop="name" />
      <el-table-column label="简介" prop="intro" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
      <el-table-column label="更新时间" prop="updated_at" width="200" />
      <el-table-column label="操作" align="center" width="200" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-edit" @click="showDialogGroupForm(scope.$index)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page="list_query.page" :limit="list_query.size" @pagination="getList" />
    <!-- 弹窗 -->
    <DialogGroupForm ref="dialogGroupForm" :api="api" @changed="getList" />
  </section>
</template>

<script>
import DialogGroupForm from './components/DialogGroupForm'
import Pagination from '@/components/Pagination'
import methods from '@/assets/methods-list'

export default {
  name: 'GroupList',
  components: { DialogGroupForm, Pagination },
  data() {
    return {
      api: '/admin/groups',
      list: [],
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
      },
      total: 0,
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  methods: {
    ...methods,
    showDialogGroupForm(index) {
      this.$refs.dialogGroupForm.show(this.list[index])
    },
  },
}
</script>
