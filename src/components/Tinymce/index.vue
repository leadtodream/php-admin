<template>
  <textarea class="tinymce-textarea" />
</template>

<script>
import { uploadImage } from '@/assets/ajax'

export default {
  name: 'Tinymce',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      is_assign: false,
    }
  },
  watch: {
    modelValue(value) {
      if (!this.is_assign) {
        this.is_assign = true
        const { tinymce } = window
        tinymce.activeEditor.selection.setContent(value)
      }
    },
  },
  created() {
    const { path } = this.$route
    this.is_assign = path.includes('add')
  },
  mounted() {
    this.initTinymce()
  },
  methods: {
    initTinymce() {
      const that = this
      const { tinymce } = window

      tinymce.init({
        selector: '.tinymce-textarea',
        language: 'zh_CN',
        height: 500,
        convert_urls: false,
        menubar: false,
        toolbar: [
          'undo redo | searchreplace bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | fullscreen preview code',
          'formatselect fontsizeselect forecolor backcolor | blockquote subscript superscript removeformat | ltr rtl hr pagebreak image table',
        ],
        plugins: 'preview searchreplace code fullscreen image table hr pagebreak lists',
        init_instance_callback(editor) {
          editor.on('NodeChange Change KeyUp', () => {
            that.$emit('update:modelValue', editor.getContent())
          })
        },
        images_upload_handler(blobInfo, success, failure, progress) {
          progress(0)
          uploadImage(blobInfo.blob(), 'html')
            .then(res => {
              success(res)
              progress(100)
            })
            .catch(() => 1)
        },
      })
    },
  }
}
</script>
