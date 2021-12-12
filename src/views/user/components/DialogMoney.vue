<template>
  <div>
    <el-dialog title="充值余额" width="500px" v-model="is_show">
      <el-form>
        <el-form-item label="充值类型">
          <el-radio v-model="sign" :label="1">增加</el-radio>
          <el-radio v-model="sign" :label="-1">减少</el-radio>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input v-model="form.money" />
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.remark" maxlength="50" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'DialogMoney',
  data() {
    return {
      sign: 1,
      form: {
        user_id: 0,
        money: '',
        remark: '',
      },
      is_show: false,
      is_submitting: false,
    }
  },
  methods: {
    showDialog(user_id) {
      this.sign = 1
      this.form.user_id = user_id
      this.form.money = ''
      this.form.remark = ''
      this.is_show = true
    },
    submit() {
      if (this.is_submitting) return
      this.is_submitting = true

      const data = { ...this.form }
      data.money *= this.sign

      ajax.post('/admin/users/money', data)
        .then(() => {
          this.$message.success('操作成功')
          this.is_show = false
          this.$emit('changed')
        })
        .finally(() => this.is_submitting = false)
    },
  },
}
</script>
