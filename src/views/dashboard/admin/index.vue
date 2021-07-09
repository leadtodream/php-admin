<template>
  <div class="dashboard-editor-container">
    <panel-group :count="count" />
    <el-card class="card">
      <template #header>待处理申请</template>
      <ul>
        <li @click="href('/withdraw/user')">
          <div>用户提现</div>
          <div class="count">{{ count.withdraw_user }}</div>
        </li>
        <li @click="href('/withdraw/shop')">
          <div>商家提现</div>
          <div class="count">{{ count.withdraw_shop }}</div>
        </li>
      </ul>
    </el-card>
    <el-card class="card">
      <template #header>待处理订单</template>
      <ul>
        <li @click="hrefOrder(0)">
          <div>待付款</div>
          <div class="count">{{ count.pending_pay }}</div>
        </li>
        <li @click="hrefOrder(1)">
          <div>待发货</div>
          <div class="count">{{ count.pending_ship }}</div>
        </li>
        <li @click="href('/shops/orders/refunds')">
          <div>售后</div>
          <div class="count">{{ count.pending_refund }}</div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import ajax from '@/assets/ajax'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
  },
  data() {
    return {
      count: {},
      is_loading: false,
    }
  },
  created() {
    this.getInfo()
  },
  activated() {
    this.getInfo()
  },
  methods: {
    href(path) {
      this.$router.push(path)
    },
    hrefOrder(state) {
      this.$store.commit('setRouteParams', { state })
      this.$router.push('/shops/orders')
    },
    getInfo() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/home')
        .then(res => {
          this.count = res.count
        })
        .finally(() => this.is_loading = false)
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

// 卡片
.card {
  display: inline-block;
  margin-right: 32px;
  margin-bottom: 32px;
  width: 500px;
  vertical-align: top;

  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
    text-align: center;
    color: gray;
    list-style: none;
  }

  li {
    cursor: pointer;
  }

  .count {
    margin-top: 1em;
    font-size: 24px;
    color: #FF6146;
  }
}
</style>
