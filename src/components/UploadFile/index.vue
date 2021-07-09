<template>
  <div>
    <div class="el-input el-input-group el-input-group--append">
      <input class="el-input__inner" readonly :value="filename">
      <label class="el-input-group__append pointer">
        选择文件
        <input ref="input-file" type="file" hidden :accept="accept" @change="upload">
      </label>
    </div>
    <el-progress :hidden="progress===100" :percentage="progress" />
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'UploadFile',
  data() {
    return {
      filename: '',
      progress: 100,
      is_waiting: false,
    }
  },
  props: {
    accept: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    upload(e) {
      if (this.is_waiting) return
      this.is_waiting = true

      const files = e.target.files
      if (!files.length) return

      const form = new FormData()
      form.append('file', files[0])

      ajax.post('/upload', form, { onUploadProgress: this.uploadProgress })
        .then(res => {
          this.filename = files[0].name
          this.$emit('input', res.filename)
        })
        .catch(() => 1)
        .finally(() => {
          this.is_waiting = false
          this.$refs['input-file'].value = null
        })
    },
    uploadProgress(e) {
      const progress = parseInt(e.loaded / e.total * 100)
      this.progress = progress
    },
  },
}
</script>