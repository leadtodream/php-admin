<template>
  <div>
    <el-dialog title="订单发货" custom-class="delivery" width="700px" v-model="is_show">
      <div class="header">
        <ul class="items">
          <li>
            <span>收货人</span>{{ address.contact }}
          </li>
          <li>
            <span>联系方式</span>{{ address.contact_phone }}
          </li>
          <li>
            <span>收货地区</span>{{ address.province }} {{ address.city }} {{ address.area }}
          </li>
          <li>
            <span>收货地址</span>{{ address.address }}
          </li>
        </ul>
        <ul class="items delivery-form">
          <li>
            <span>快递公司</span>
            <input v-model="form.company" class="el-input__inner">
          </li>
          <li>
            <span>物流单号</span>
            <input v-model="form.number" class="el-input__inner">
          </li>
          <button type="button" class="el-button el-button--success" @click="submit">发 货</button>
        </ul>
      </div>
      <!-- <el-table class="delivery-goods" :data="deliveryGoods">
        <el-table-column prop="name" label="商品">
          <template #default="scope">
            <img class="goods-img" :src="row.img"> {{row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="sku" label="规格" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="state_str" label="售后状态" />
      </el-table> -->
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  data() {
    return {
      id: 0,
      address: {},
      form: {
        company: '',
        number: '',
      },
      is_show: false,
    }
  },
  props: ['api'],
  methods: {
    show(id, address) {
      this.id = id
      this.address = address
      this.form.company = ''
      this.form.number = ''
      this.is_show = true
    },
    submit() {
      ajax.patch(`${this.api}/${this.id}/delivery`, this.form)
        .then(() => {
          this.$message.success('操作成功')
          this.is_show = false
          this.$emit('changed')
        })
        .catch(() => 1)
    },
  },
}
</script>

<style lang="scss" scoped>
/* 发货
---------------------------------------------- */
.delivery .header {
  display: flex;
  justify-content: space-between;
}
.delivery-form {
  width: 50%;

  .el-input__inner {
    width: calc(100% - 5em);
  }
  .el-button {
    float: right;
  }
}
.delivery-goods {
  margin-top: 20px;
}
</style>
