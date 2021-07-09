<template>
  <section>
    <el-card class="form-card">
      <template #header>
        <span>Book Info</span>
        <button class="submit" type="button" @click="saveInfo">Save</button>
      </template>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Category">
          <el-select v-model="form.category_id" placeholder="请选择">
            <el-option v-for="i in list_category" :key="i.id" :label="i.name" :value="i.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Author">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="Nation">
          <el-input v-model="form.nation" />
        </el-form-item>
        <el-form-item label="Cover">
          <el-input v-model="form.color" :disabled="true" />
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import methods from '@/assets/methods-form'
import { queryCategory } from '@/assets/methods-query'

export default {
  name: 'BookForm',
  data() {
    return {
      api: '/admin/books',
      id: 0,
      form: {
        category_id: '',
        name: '',
        author: '',
        nation: '',
        color: '',
      },
      list_category: [],
    }
  },
  created() {
    this.init()
    this.queryCategory('book')
  },
  methods: {
    ...methods,
    queryCategory,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/form-card.scss';
</style>
