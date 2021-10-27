<template>
  <section>
    <el-form label-width="5em">
      <el-form-item label="标题" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="内容" required>
        
      </el-form-item>
    </el-form>
    <el-footer>
      <el-button type="info" plain @click="close">取 消</el-button>
      <el-button type="primary" @click="saveInfo">保 存</el-button>
    </el-footer>
  </section>
</template>

<script>
import methods from '@/assets/methods-form'

export default {
  name: 'FaqForm',
  data() {
    return {
      api: '/admin/faqs',
      id: 0,
      form: {
        name: '',
        html: '',
      },
      is_waiting: false,
    }
  },
  created() {
    // this.init()
  },
  methods: {
    ...methods,
  },
}
</script>
