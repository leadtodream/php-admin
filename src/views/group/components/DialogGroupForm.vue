<template>
  <div>
    <el-dialog title="分组信息" width="500px" v-model="is_show">
      <el-form label-width="5em">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" @click="submit2">保 存</el-button>
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
        name: '',
        intro: '',
      },
      is_show: false,
    }
  },
  props: ['api'],
  methods: {
    show(info) {
      if (info) {
        this.id = info.id
        this.form.name = info.name
        this.form.intro = info.intro
      } else {
        this.id = 0
        this.form.name = ''
        this.form.intro = ''
      }

      this.is_show = true
    },
    submit2() {
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
    },
  },
}
</script>
