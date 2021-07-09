<template>
  <div>
    <el-dialog title="售后处理" width="500px" v-model="is_show">
      <el-form>
        <el-form-item label="处理结果">
          <el-radio v-model="form.state" :label="1">同意</el-radio>
          <el-radio v-model="form.state" :label="-1">驳回</el-radio>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.remark" maxlength="50" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" :loading="is_waiting" @click="patchState">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'DialogCheckRefund',
  data() {
    return {
      id: 0,
      form: {
        state: 1,
        remark: '',
      },
      is_show: false,
      is_waiting: false,
    }
  },
  props: ['api'],
  methods: {
    patchState() {
      if (this.is_waiting) return
      this.is_waiting = true

      const data = this.form
      if (data.state < 0 && !data.remark) {
        return this.$message.error('请填写驳回原因')
      }

      ajax.patch(`${this.api}/${this.id}/state`, data)
        .then(() => {
          this.$message.success('操作成功')
          this.is_show = false
          this.$emit('changed')
        })
        .catch(() => 1)
        .finally(() => this.is_waiting = false)
    },
    show(id) {
      this.id = id
      this.form.state = 1
      this.form.remark = ''
      this.is_show = true
    },
  },
}
</script>
