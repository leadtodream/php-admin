<template>
  <div class="container">
    <img src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3" class="emptyGif">
    <p>没有任何权限！</p>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'DashboardGuest',
  data() {
    return {
      is_shop: false,
    }
  },
  created() {
    // this.getShopInfo()
  },
  methods: {
    getShopInfo() {
      ajax.get('/shop/profile', { selfCatch: true })
        .then(res => {
          if (res.state) this.is_shop = true
        })
        .catch(() => 1)
    },
    toShop() {
      window.location.href = '/shop/index.html'
    },
  },
}
</script>

<style scoped>
.container {
  background: #E3E3E3;
}
img {
  display: block;
  width: 45%;
  margin: 0 auto;
}
p {
  text-align: center;
}
</style>
