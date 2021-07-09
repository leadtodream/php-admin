<template>
  <div>
    <ul class="el-upload-list el-upload-list--picture-card">
      <li v-for="(i,index) in value" :key="index" class="el-upload-list__item is-success">
        <img class="el-upload-list__item-thumbnail" :src="i">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete" @click="del(index)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
    </ul>
    <label class="el-upload el-upload--picture-card">
      <i :class="[is_waiting ? 'el-icon-loading' : 'el-icon-plus']"></i>
      <input ref="input" type="file" accept="image/*" name="file" multiple="multiple" class="el-upload__input" @change="add">
    </label>
  </div>
</template>

<script>
import { uploadImage } from '@/assets/ajax'

export default {
  name: 'UploadImgs',
  data() {
    return {
      is_waiting: false,
    }
  },
  props: {
    value: Array,
  },
  methods: {
    add(e) {
      if (this.is_waiting) return
      this.is_waiting = true
  
      const files = e.target.files
      files.forEach(i => {
        uploadImage(i)
          .then(res => {
            this.value.push(res)
          })
          .catch(() => 1)
          .finally(() => {
            this.is_waiting = false
            this.$refs['input'].value = null
          })
      })
    },
    del(index) {
      this.value.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.el-upload-list__item-thumbnail {
  object-fit: contain;
}
</style>
