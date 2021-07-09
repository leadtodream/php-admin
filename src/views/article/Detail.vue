<template>
  <section>
    <h1>{{ info.name }}</h1>
    <article v-html="info.html"></article>
  </section>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'ArticleDetail',
  data() {
    return {
      id: 0,
      info: {},
    }
  },
  created() {
    const { id } = this.$route.params
    this.getInfo(id)
  },
  methods: {
    getInfo(id) {
      ajax.get(`/admin/articles/${id}`)
        .then(res => {
          this.info = res.info
        })
    },
  },
}
</script>
