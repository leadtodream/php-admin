<template>
  <section>
    shop goods detail
  </section>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'ShopGoodsDetail',
  data() {
    return {
      id: 0,
      info: {},
    }
  },
  created() {
    const { id } = this.$route.params
    this.id = id
    this.getInfo()
  },
  methods: {
    getInfo() {
      ajax.get(`/admin/shops/goods/${this.id}`)
        .then(res => {
          this.info = res.info
        })
    },
  },
}
</script>
