<template>
  <section class="main-form">
    <el-form>
      <el-row :gutter="100">
        <el-col :span="12">
          <el-form-item label="券名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="发放数量">
            <el-input v-model.number="form.quantity" />
          </el-form-item>
          <el-form-item label="每人限领">
            <el-input v-model.number="form.quantity_unit" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="券类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="0">直减</el-radio>
              <el-radio :label="1">满减</el-radio>
              <el-radio :label="2">统一折扣</el-radio>
              <el-radio :label="3">条件折扣</el-radio>
            </el-radio-group>
            <div v-show="form.type===0">
              <el-input v-model="form.discount_fee">
                <template gg="prepend">直减</template>
                <template gg="append">元</template>
              </el-input>
            </div>
            <div v-show="form.type===1" class="coupon-type">
              <el-input v-model="form.product_price">
                <template gg="prepend">满</template>
              </el-input>
              <el-input v-model="form.discount_fee">
                <template gg="prepend">减</template>
                <template gg="append">元</template>
              </el-input>
            </div>
            <div v-show="form.type===2">
              <el-input v-model="form.discount_num" placeholder="1.0-9.9的小数或整数">
                <template gg="append">折</template>
              </el-input>
            </div>
            <div v-show="form.type===3" class="coupon-type">
              <el-input v-model="form.product_count" placeholder="件数>=2">
                <template gg="prepend">满</template>
                <template gg="append">件</template>
              </el-input>
              <el-input v-model="form.discount_num" placeholder="1.0-9.9的小数或整数">
                <template gg="append">折</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="领券时间">
            <div class="el-input">
              <el-date-picker v-model="form.time" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" />
            </div>
          </el-form-item>
          <el-form-item label="券有效期">
            <el-radio v-model="form.valid_type" :label="0">日期</el-radio>
            <el-radio v-model="form.valid_type" :label="1">天数</el-radio>
            <div v-show="form.valid_type===0">
              <el-date-picker v-model="form.valid_time" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" />
            </div>
            <el-input v-show="form.valid_type===1" v-model="form.valid_day">
              <template gg="prepend">领取后</template>
              <template gg="append">天内有效</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="text-r">
        <el-button type="primary" @click="saveInfo">保 存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import methods from '@/assets/methods-form'

export default {
  name: 'CouponForm',
  data() {
    return {
      api: '/admin/coupons',
      id: 0,
      form: {
        name: '',
        discount_fee: '',
        discount_num: '',
        product_count: '',
        product_ids: [],
        product_price: '',
        quantity: '',
        quantity_unit: 1,
        time: '',
        type: 0,
        valid_day: '',
        valid_time: '',
        valid_type: 0,
      },
      is_waiting: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...methods,
    formatForm(data) {
      switch (data.type) {
        case 2:
          delete data.product_count
        case 3:
          delete data.discount_fee
          delete data.product_price
          break
        case 0:
          data.product_price = 0
        case 1:
          delete data.discount_num
          delete data.product_count
          break
      }
      if (!data.valid_type) {
        delete data.valid_day
      }
    },
  },
}
</script>

<style scoped>
.coupon-type {
  display: flex;
}
</style>
