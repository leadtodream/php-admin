<template>
  <div>
    <el-dialog title="提现审核" width="500px" v-model="is_show">
      <el-form>
        <el-form-item label="审核结果">
          <el-radio v-model="form.state" :label="1">批准</el-radio>
          <el-radio v-model="form.state" :label="-1">驳回</el-radio>
          <el-radio v-model="form.state" :label="2">线下转账</el-radio>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.remark" maxlength="50" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" @click="patchState">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  data() {
    return {
      id: 0,
      form: {
        state: 1,
        remark: '',
      },
      is_show: false,
    }
  },
  props: ['api'],
  methods: {
    show(id) {
      this.id = id
      this.form.state = 1
      this.form.remark = ''
      this.is_show = true
    },
    patchState() {
      ajax.patch(`${this.api}/${this.id}/state`, this.form)
        .then(() => {
          this.$message.success('操作成功')
          this.is_show = false
          this.$emit('changed')
        })
    },
  },
}
</script>
