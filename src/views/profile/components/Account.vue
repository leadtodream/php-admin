<template>
  <el-form label-width="5em">
    <UploadImg v-model="form.img" class="avatar" width="150px" module="avatar" />
    <el-form-item label="账号">
      <el-input v-model="form.username" class="input" disabled />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.realname" class="input" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone" class="input" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" class="input" />
    </el-form-item>
    <el-form-item label="修改密码">
      <el-input v-model="form.password" class="input" show-password placeholder="请输入新密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保 存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadImg from '@/components/UploadImg'
import ajax from '@/assets/ajax'

export default {
  components: { UploadImg },
  data() {
    return {
      api: '/admin/profile',
      form: {
        img: '',
        email: '',
        username: '',
        realname: '',
        password: '',
        phone: '',
      },
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      ajax.get(this.api)
        .then(res => {
          Object.assign(this.form, res.info)
        })
    },
    submit() {
      ajax.put(this.api, this.form)
        .then(() => {
          this.$message.success('保存成功')
          this.form.password = ''
          this.$store.dispatch('user/setAvatar', this.form.img)
        })
    },
  },
}
</script>

<style scoped>
.avatar {
  position: absolute;
  z-index: 1;
  right: 0;
  margin-bottom: 15px;
  text-align: center;
}
.input {
  max-width: 300px;
}
</style>
