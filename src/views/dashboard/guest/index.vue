<template>
  <div class="container">
    <img src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3" class="emptyGif">
    <button
      v-if="is_shop"
      type="button"
      class="el-button el-button--primary el-button--medium"
      @click="toShop"
    >去我的店铺</button>
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

<style lang="scss" scoped>
.container {
  background: #E3E3E3;
}
  img {
    display: block;
    width: 45%;
    margin: 0 auto;
  }
  button {
    display: block;
    margin: auto;
    transform: translateY(60px);
  }
</style>
