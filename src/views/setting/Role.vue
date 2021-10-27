<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
      <el-button-group>
        <el-button type="primary" @click="showDialogRoleForm(null)">添 加</el-button>
      </el-button-group>
    </div>
    <!-- 表格-内容 -->
    <el-table ref="table" v-loading="is_loading" :data="list">
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="是否封禁" width="150">
        <template #default="scope">
          <el-switch v-model="scope.row.is_ban" active-color="#ff4949" @change="patchBan(scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="180" />
      <el-table-column label="更新时间" prop="updated_at" width="180" />
      <el-table-column label="操作" align="center" width="180" class-name="table-column-action">
        <template #default="scope">
          <div v-if="scope.row.id!==1">
            <el-button plain type="info" size="mini" icon="el-icon-edit" @click="showDialogRoleForm(scope.$index)" />
            <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
    <!-- 弹窗 -->
    <DialogRoleForm ref="dialogRoleForm" :api="api" @changed="getList" />
  </section>
</template>

<script>
import DialogRoleForm from './components/DialogRoleForm'
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'

export default {
  name: 'Role',
  components: { DialogRoleForm, Pagination },
  data() {
    return {
      api: '/admin/roles',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        name: '',
      },
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  methods: {
    ...methods,
    patchBan(id) {
      ajax.patch(`${this.api}/${id}/ban`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },
    showDialogRoleForm(index) {
      this.$refs['dialogRoleForm'].show(this.list[index])
    },
  },
}
</script>
