<template>
  <section>
    <el-card class="card-items float-l">
      <div gg="header">
        <span>售后信息</span>
        <span class="float-r color-primary">{{ info.state_str }}</span>
      </div>
      <ul class="items">
        <li>
          <div class="label">售后单号</div>
          <div>{{ info.number }}</div>
        </li>
        <li>
          <div class="label">退款金额</div>
          <div>{{ info.money }}</div>
        </li>
        <li>
          <div class="label">售后商品</div>
          <div class="goods">
            <div>
              <img class="img float-l" :src="goods.img">
              <span>{{ goods.name }}</span>
              <br>
              <span class="color-gray">{{ goods.sku || '-' }}</span>
            </div>
            <div>
              <div>￥{{ goods.price }}</div>
              <div class="color-gray text-r">×{{ goods.quantity }}</div>
            </div>
          </div>
        </li>
        <li>
          <div class="label">申请原因</div>
          <div>{{ info.reason }}</div>
        </li>
        <li>
          <div class="label">申请内容</div>
          <div class="description">
            <div>{{ info.description || '-' }}</div>
            <img v-for="i in infoImgs" class="img" :key="i" :src="i" @click="openWindow(i)" />
          </div>
        </li>
        <li>
          <div class="label">申请时间</div>
          <div>{{ info.created_at }}</div>
        </li>
      </ul>
    </el-card>
    <el-card class="card-items">
      <div gg="header">
        <span>订单信息</span>
        <router-link class="float-r color-primary" :to="`/shops/orders/${order.id}`">详情</router-link>
      </div>
      <ul class="items">
        <li>
          <div class="label">订单状态</div>
          <div>{{ order.state_str }}</div>
        </li>
        <li>
          <div class="label">订单编号</div>
          <div>{{ order.number }}</div>
        </li>
        <li>
          <div class="label">下单时间</div>
          <div>{{ order.created_at }}</div>
        </li>
        <li>
          <div class="label">支付时间</div>
          <div>{{ order.time_pay }}</div>
        </li>
      </ul>
    </el-card>
    <el-card class="card-items">
      <div gg="header">退货物流</div>
      <ul v-if="infoDelivery" class="items">
        <li>
          <div class="label">快递公司</div>
          <div>{{ infoDelivery.company }}</div>
        </li>
        <li>
          <div class="label">物流单号</div>
          <div>{{ infoDelivery.number }}</div>
        </li>
      </ul>
      <p v-else>暂无物流信息</p>
    </el-card>
  </section>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'ShopOrderRefundDetail',
  data() {
    return {
      api: '/admin/shops/goods/orders/refunds',
      id: 0,
      info: {},
      goods: {},
      order: {},
    }
  },
  computed: {
    infoImgs() {
      return this.info.imgs || []
    },
    infoDelivery() {
      return this.info.delivery || null
    },
  },
  created() {
    this.id = this.$route.params.id
    this.getInfo()
  },
  methods: {
    getInfo() {
      ajax.get(`${this.api}/${this.id}`)
        .then(res => {
          this.info = res.info
          this.goods = res.goods
          this.order = res.order
        })
    },
    openWindow(url) {
      window.open(url)
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background: inherit;
}

// 卡片-条目
.card-items {
  margin: 0 40px 40px 0;
  width: 510px;

  li {
    display: flex;
  }
  .label {
    width: 5em;
    color: gray;
  }
}

// 商品
.goods {
  padding: 6px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  background: #F6F7F8;
  line-height: 24px;
}

// 描述
.description {
  flex: 1;

  .img {
    margin-top: 10px;
    vertical-align: top;
  }
}

// 图片
.img {
  margin-right: 15px;
  width: 62px;
  height: 62px;
  border-radius: 4px;
}
</style>
