<template>
  <section>
    <el-card class="form-card">
      <template #header>
        <span>Article Info</span>
        <button class="submit" type="button" @click="saveInfo">Save</button>
      </template>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Created at">
          <el-input v-model="form.date" type="date" />
        </el-form-item>
        <el-form-item label="Markdown">
          <UploadFile v-model="form.file" accept=".md" />
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import methods from '@/assets/methods-form'

export default {
  name: 'ArticleForm',
  components: { UploadFile },
  data() {
    return {
      api: '/admin/articles',
      id: 0,
      form: {
        name: '',
        file: '',
        date: '',
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

<style lang="scss" scoped>
@import '@/assets/css/form-card.scss';
button + i {
  margin-left: 1em;
}
</style>
