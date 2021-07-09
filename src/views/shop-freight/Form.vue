<template>
  <section>
    <el-form label-width="80px">
      <el-form-item label="模板名称" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="计费方式">
        <el-radio-group v-model="form.type" :disabled="id>0">
          <el-radio :label="0">按件数</el-radio>
          <el-radio :label="1">按重量</el-radio>
          <!-- <el-radio :label="2">按体积</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运送方式">
        <el-radio-group>
          <el-radio checked>快递</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认运费" required>
        <div class="freight">
          <input v-model="form.calc.unit" class="input">
          <span>{{ standardStr }}内</span>
          <input v-model="form.calc.fee" class="input">
          <span>元；每增加</span>
          <input v-model="form.calc.add_unit" class="input">
          <span>{{ standardStr }}，增加</span>
          <input v-model="form.calc.add_fee" class="input">
          <span>元</span>
        </div>
      </el-form-item>
      <el-form-item label="条件包邮">
        <div class="freight">
          <span>满</span>
          <input v-model="form.free.unit" class="input">
          <span>{{ standardStr }}；或满</span>
          <input v-model="form.free.fee" class="input">
          <span>元</span>
        </div>
      </el-form-item>
      <el-form-item class="text-r">
        <el-button type="primary" @click="saveInfo(null)">保 存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import methods from '@/assets/methods-form'

export default {
  name: 'ShopFreightForm',
  data() {
    return {
      api: '/admin/shop/freights',
      id: 0,
      form: {
        name: '',
        type: 0,
        calc: {
          add_fee: '',
          add_unit: '',
          fee: '',
          unit: '',
        },
        free: {
          fee: '',
          unit: '',
        },
      },
      region_other: [],
      region_free: [],
    }
  },
  computed: {
    standardStr() {
      return ['件', 'kg', 'm³'][this.form.type]
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...methods,
  },
}
</script>

<style lang="scss" scoped>
main {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}

// 运费
.freight {
  margin: 0;

  .input {
    margin: 0 5px;
    padding: 5px;
    width: 100px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    outline: none;
  }
}
</style>
