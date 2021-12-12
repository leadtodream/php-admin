<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs class="tabs" model-value="info">
        <el-tab-pane label="基本信息" name="info">
          <GoodsInfo :info="form" :imgs="list_img" />
        </el-tab-pane>
        <el-tab-pane label="销售规格" name="sku">
          <GoodsSku ref="GoodsSku" :list="list_sku" />
        </el-tab-pane>
        <el-tab-pane label="图文详情" name="description">
          <tinymce v-model="form.html" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item class="text-r">
        <el-button type="primary" :loading="is_submitting" @click="saveInfo">保 存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import GoodsInfo from './components/GoodsInfo'
import GoodsSku from './components/GoodsSku'
import Tinymce from '@/components/Tinymce'
import methods from '@/assets/methods-form'

export default {
  name: 'GoodsForm',
  components: { GoodsInfo, GoodsSku, Tinymce },
  data() {
    return {
      api: '/admin/goods',
      id: 0,
      is_submitting: false,
      form: {
        html: '',
        intro: '',
        name: '',
        price: '',
        price_line: '',
        shop_freight_id: 0,
        stock: '',
        video: '',
        weight: '',
      },
      list_img: [],
      list_sku: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...methods,
    getInfoThen(res) {
      const imgs = res.info.imgs
      this.list_img.push(...imgs)
      this.assignForm(res.info)
      if (res.skus) {
        this.$refs['GoodsSku'].formatSkus(res.skus)
      }
    },
    formatForm(data) {
      data.imgs = this.list_img
      data.skus = this.list_sku.filter(i => i.is_sale)
    },
  },
}
</script>

<style scoped>
main {
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
}

.tabs {
  margin-bottom: 22px;
}
</style>