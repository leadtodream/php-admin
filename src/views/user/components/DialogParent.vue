<template>
  <div>
    <el-dialog title="修改推荐人" width="500px" v-model="is_show">
      <el-select
        v-model="parent_id"
        filterable
        remote
        placeholder="请输入姓名/手机号搜索推荐人"
        :remote-method="queryUser"
      >
        <el-option v-for="item in list_user" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'
import { queryUser } from '@/assets/methods-query'

export default {
  name: 'DialogParent',
  data() {
    return {
      user_id: 0,
      parent_id: '',
      list_user: [],
      is_show: false,
      is_waiting: false,
    }
  },
  methods: {
    queryUser,
    showDialog(user_id) {
      this.user_id = user_id
      this.parent_id = ''
      this.is_show = true
    },
    submit() {
      if (this.is_waiting) return
      this.is_waiting = true

      ajax.patch(`/admin/users/${this.user_id}/parent`, { parent_id: this.parent_id })
        .then(() => {
          this.$message.success('操作成功')
          this.is_show = false
          this.$emit('changed')
        })
        .finally(() => this.is_waiting = false)
    },
  },
}
</script>
