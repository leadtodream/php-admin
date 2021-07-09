<template>
  <section>
    <el-card class="timeline">
      <div gg="header">
        <span>订单号：{{ info.number }}</span>
        <span class="float-r">{{ info.state_str }}</span>
      </div>
      <el-timeline>
        <el-timeline-item :type="info.state===0?'primary':''" placement="top" :timestamp="info.created_at">用户下单</el-timeline-item>
        <el-timeline-item v-if="info.time_pay" :type="info.state===1?'primary':''" placement="top" :timestamp="info.time_pay">买家付款</el-timeline-item>
        <el-timeline-item v-if="info.time_delivery" :type="info.state===2?'primary':''" placement="top" :timestamp="info.time_delivery">卖家发货</el-timeline-item>
        <el-timeline-item v-if="info.time_receive" :type="info.state===3?'primary':''" placement="top" :timestamp="info.time_receive">确认收货</el-timeline-item>
        <el-timeline-item v-if="info.state===-1" :type="info.state===-1?'primary':''" placement="top" :timestamp="info.time_cancel">
          已取消 【{{ info.cancel_reason }}】
        </el-timeline-item>
      </el-timeline>
    </el-card>
    <el-card class="delivery">
      <div gg="header">发货信息</div>
      <ul class="items">
        <li>
          <span>收件人</span>{{ deliveryAddress.contact }} {{ deliveryAddress.contact_phone }}
        </li>
        <li>
          <span>收货地区</span>{{ deliveryAddress.province }} {{ deliveryAddress.city }} {{ deliveryAddress.area }}
        </li>
        <li>
          <span>详细地址</span>{{ deliveryAddress.address }}
        </li>
        <li>
          <span>快递公司</span>{{ delivery.company }}
        </li>
        <li>
          <span>快递单号</span>{{ delivery.number }}
          <button v-if="info.state===1" class="el-button el-button--success el-button--mini float-r" @click="showDialogDelivery">发 货</button>
        </li>
      </ul>
    </el-card>
    <el-card class="order">
      <div gg="header">商品信息</div>
      <table class="el-table">
        <tr class="success-row">
          <th>商品</th>
          <th>规格</th>
          <th>数量</th>
          <th>单价</th>
          <th>实际支付</th>
          <th>售后状态</th>
        </tr>
        <tr v-for="i in list_package" :key="i.id">
          <td>
            <img :src="i.img">{{ i.name }}
          </td>
          <td>{{ i.sku || '-' }}</td>
          <td>{{ i.quantity }}</td>
          <td>￥{{ i.price }}</td>
          <td>￥{{ i.money }}</td>
          <td>{{ i.state_str }}</td>
        </tr>
        <tr :hidden="!list_package.length">
          <td></td>
          <td></td>
          <td>
            <span class="color-gray">优惠：</span>-￥{{ info.money_discount }}
          </td>
          <td>
            <span class="color-gray">运费：</span>￥{{ info.money_freight }}
          </td>
          <td>
            <span class="color-gray">商品：</span>￥{{ info.money }}
          </td>
          <td>
            <span class="color-gray">实收款：</span>
            <strong>￥{{ info.money_pay }}</strong>
          </td>
        </tr>
      </table>
    </el-card>
    <!-- 弹窗 -->
    <DialogDelivery ref="dialogDelivery" :api="api" @changed="getInfo" />
  </section>
</template>

<script>
import DialogDelivery from './components/DialogDelivery'
import ajax from '@/assets/ajax'

export default {
  name: 'ShopOrderDetail',
  components: { DialogDelivery },
  data() {
    return {
      api: '/admin/shops/goods/orders',
      id: 0,
      info: {},
      list_package: [],
    }
  },
  computed: {
    delivery() {
      return this.info.delivery || {}
    },
    deliveryAddress() {
      return this.info.delivery_address || {}
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
          this.list_package = res.packages
        })
        .catch(() => 1)
    },
    showDialogDelivery() {
      this.$refs.dialogDelivery.show(this.id, this.deliveryAddress)
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background: inherit;
}
.timeline,
.delivery {
  float: left;
  margin: 0 40px 40px 0;
  width: 400px;
}
.timeline .float-r {
  color: #1890ff;
}
.delivery {
  .user {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;

    > span {
      margin-right: 1em;
    }
  }
}
.el-table {
  border-spacing: 0;

  tr:first-child,
  th {
    background: lightblue;
  }
  th:first-child {
    padding-left: 1em;
  }

  img {
    width: 80px;
    height: 80px;
    vertical-align: middle;
    margin-right: 1em;
  }
}

@media screen and (max-width: 1600px) {
  .order {
    clear: both;
  }
}
</style>
