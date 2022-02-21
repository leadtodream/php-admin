<template>
  <section class="main-form">
    <el-form label-width="6em">
      <el-form-item label="模板名称" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="计价方式">
        <el-radio-group v-model="form.type" :disabled="id>0">
          <el-radio :label="0">按件数</el-radio>
          <el-radio :label="1">按重量</el-radio>
          <el-radio :label="2">按体积</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运送方式">
        <el-radio-group>
          <el-radio checked>快递</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认运费" required>
        <div class="inline">
          <input v-model="form.calc.unit" class="el-input__inner">
          <span>{{ standardStr }}内</span>
          <input v-model="form.calc.fee" class="el-input__inner">
          <span>元；每增加</span>
          <input v-model="form.calc.add_unit" class="el-input__inner" placeholder="(可选)">
          <span>{{ standardStr }}，增加</span>
          <input v-model="form.calc.add_fee" class="el-input__inner" placeholder="(可选)">
          <span>元</span>
        </div>
      </el-form-item>
      <el-form-item label="条件包邮">
        <div class="inline">
          <span>满</span>
          <input v-model="form.free.fee" class="el-input__inner" placeholder="(可选)">
          <span>元；或满</span>
          <input v-model="form.free.unit" class="el-input__inner" placeholder="(可选)">
          <span>{{ standardStr }}</span>
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
  name: 'FreightForm',
  data() {
    return {
      api: '/admin/freights',
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
    getInfoThen(res) {
      const info = res.info

      if (!info.calc.add_unit) {
        info.calc.add_unit = ''
      }
      if (!info.calc.add_fee) {
        info.calc.add_fee = ''
      }
      if (!info.free.fee) {
        info.free.fee = ''
      }
      if (!info.free.unit) {
        info.free.unit = ''
      }

      this.assignForm(info)
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}

.inline > .el-input__inner {
  margin: 0 0.5em;
  width: 80px;
}
</style>
