<template>
  <section>
    <el-form label-width="5em">
      <el-form-item label="标题" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="内容" required>
        <tinymce v-model="form.html" />
      </el-form-item>
    </el-form>
    <el-footer>
      <el-button type="info" plain @click="close">取 消</el-button>
      <el-button type="primary" @click="saveInfo">保 存</el-button>
    </el-footer>
  </section>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import methods from '@/assets/methods-form'

export default {
  name: 'NoticeForm',
  components: { Tinymce },
  data() {
    return {
      api: '/admin/notices',
      id: 0,
      form: {
        name: '',
        html: '',
      },
      is_submitting: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...methods,
  },
}
</script>
