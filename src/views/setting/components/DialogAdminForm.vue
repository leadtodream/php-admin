<template>
  <div>
    <el-dialog title="管理员信息" width="500px" v-model="is_show">
      <el-form label-width="5em">
        <el-form-item label="角色" required>
            <el-select v-model="form.role_id">
              <el-option v-for="i in roles" :key="i.id" :label="i.name" :value="i.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="账号" required>
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'
import { assignForm } from '@/assets/methods'

export default {
  data() {
    return {
      id: 0,
      form: {
        password: '',
        remark: '',
        role_id: '',
        username: '',
      },
      form_copy: {},
      is_show: false,
    }
  },
  props: ['api','roles'],
  created() {
    Object.assign(this.form_copy, this.form)
  },
  methods: {
    show(info) {
      if (info) {
        this.id = info.id
        if (!info.role_id) {
          info.role_id = ''
        }
        assignForm(this.form, info)
      } else {
        this.id = 0
        Object.assign(this.form, this.form_copy)
      }

      this.is_show = true
    },
    submit() {
      const data = this.form
      let url = this.api
      let method = 'post'
      if (this.id) {
        method = 'put'
        url = `${url}/${this.id}`
      }

      ajax({ method, url, data })
        .then(() => {
          this.$message.success('保存成功')
          this.is_show = false
          this.$emit('changed')
        })
        .catch(() => 1)
    },
  },
}
</script>
