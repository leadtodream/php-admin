<template>
  <label>
    <img :src="imgSrc" :style="imgStyle">
    <input ref="input" type="file" accept="image/*" hidden @change="uploadImg">
  </label>
</template>

<script>
import { uploadImage } from '@/assets/ajax'

export default {
  name: 'UploadImg',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '',
    },
    module: {
      type: String,
      default: '',
    },
  },
  computed: {
    imgSrc() {
      return this.modelValue || require('./img.png')
    },
    imgStyle() {
      return {
        width: this.width,
        height: this.height || this.width,
      }
    },
  },
  methods: {
    uploadImg(e) {
      const files = e.target.files
      if (files.length) {
        uploadImage(files[0], this.module)
          .then(res => {
            this.$emit('update:modelValue', res)
            this.$emit('changed')
          })
          .finally(() => {
            this.$refs['input'].value = null
          })
      }
    },
  },
}
</script>

<style scoped>
img {
  border-radius: 5px;
  cursor: pointer;
  vertical-align: top;
  object-fit: cover;
}
</style>
