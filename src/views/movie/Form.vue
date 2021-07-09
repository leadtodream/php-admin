<template>
  <section>
    <el-card class="form-card">
      <template #header>
        <span>Movie Info</span>
        <button class="submit" type="button" @click="saveInfo">Save</button>
      </template>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Category">
          <el-select v-model="form.category_id">
            <el-option label="Animation" value="1" />
            <el-option label="Anime" value="2" />
            <el-option label="TV" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Release">
        <el-input v-model="form.release" />
      </el-form-item>
      <el-form-item label="Episode">
        <el-input v-model="form.episode" />
      </el-form-item>
      <el-form-item label="Runtime">
        <el-input v-model="form.runtime" />
      </el-form-item>
      <el-form-item label="Tag">
        <el-input v-model="form.tag" />
      </el-form-item>
      <el-form-item label="Rate">
        <el-rate v-model="form.rate" show-text :texts="['不会看第二遍','2','3','4','5']" />
      </el-form-item>
      <el-form-item label="Cover">
        <UploadImg v-model="form.img" width="150px" height="215px" />
      </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import UploadImg from '@/components/UploadImg'
import methods from '@/assets/methods-form'

export default {
  name: 'MovieForm',
  components: { UploadImg },
  data() {
    return {
      api: '/admin/movies',
      id: 0,
      form: {
        category_id: '',
        name: '',
        img: '',
        release: '',
        episode: '',
        runtime: '',
        tag: '',
        rate: 0,
      },
      is_waiting: false,
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

::v-deep(.el-rate) {
  margin-top: 10px;
}
</style>
