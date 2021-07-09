<template>
  <div>
    <el-dialog title="类别信息" width="500px" v-model="is_show">
      <el-form ref="dataForm" :model="form" label-position="left" label-width="70px">
        <el-form-item label="图标" prop="name">
          <UploadImg v-model="form.img" module="category" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show = false">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg'
import ajax from '@/assets/ajax'

export default {
  name: 'DialogCategoryForm',
  components: { UploadImg },
  data() {
    return {
      id: 0,
      form: {
        img: '',
        name: '',
        parent_id: 0,
      },
      is_show: false,
    }
  },
  props: ['api'],
  methods: {
    show(info) {
      if (info) {
        this.id = info.id
        this.form.img = info.img
        this.form.name = info.name
        this.form.parent_id = info.parent_id
      } else {
        this.id = 0
        this.form.img = ''
        this.form.name = ''
        this.form.parent_id = 0
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
    },
  },
}
</script>
