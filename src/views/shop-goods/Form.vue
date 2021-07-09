<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs class="tabs" value="info">
        <el-tab-pane label="基本信息" name="info">
          <el-form-item label="商品图片" required>
            <ul class="goods-imgs">
              <li v-for="(i,index) in list_img" :key="index" @click="chooseImg(index)">
                <img v-show="i" :src="i">
                <i v-show="i" class="el-icon-delete-solid" @click.stop="delImg(index)"></i>
                <i v-show="!i" class="el-icon-plus"></i>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="商品名称" required>
            <el-input v-model="form.name" maxlength="50" />
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="form.intro" maxlength="50" />
          </el-form-item>
          <div class="el-form--inline">
            <div class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 80px;">价格</label>
              <div class="el-form-item__content">
                <input v-model="form.price" class="el-input__inner">
              </div>
            </div>
            <div class="el-form-item">
              <label class="el-form-item__label">划线价格</label>
              <div class="el-form-item__content">
                <input v-model="form.price_line" class="el-input__inner">
              </div>
            </div>
          </div>
          <el-form-item label="库存">
            <el-input v-model="form.stock" />
          </el-form-item>
          <div class="el-form--inline">
            <div class="el-form-item">
              <label class="el-form-item__label" style="width: 80px;">运费模板</label>
              <div class="el-form-item__content">
                <el-select v-model="form.shop_freight_id">
                  <el-option v-for="i in list_freight" :key="i.id" :label="i.name" :value="i.id">{{ i.name }}</el-option>
                </el-select>
              </div>
            </div>
            <div v-show="freightType===1" class="el-form-item">
              <label class="el-form-item__label">商品重量</label>
              <div class="el-form-item__content">
                <div class="short-input el-input el-input-group el-input-group--append">
                  <input v-model="form.weight" class="el-input__inner">
                  <div class="el-input-group__append">kg</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售规格" name="sku">
          <GoodsSku v-model="list_sku" />
        </el-tab-pane>
        <el-tab-pane label="图文详情" name="description">
          <tinymce v-model="form.html" module="html_notice" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item class="text-r">
        <el-button type="primary" @click="saveInfo">保 存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import GoodsSku from './components/GoodsSku'
import Tinymce from '@/components/Tinymce'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-form'

export default {
  name: 'ShopGoodsForm',
  components: { GoodsSku, Tinymce },
  data() {
    return {
      api: '/admin/shops/goods',
      id: 0,
      form: {
        html: '',
        intro: '',
        name: '',
        price: '',
        price_line: '',
        shop_id: 0,
        shop_freight_id: 0,
        stock: '',
        weight: '',
      },
      list_freight: [{ id: 0, name: '包邮', type: 0 }], // 运费模板
      list_img: new Array(5),
      list_sku: [],
    }
  },
  computed: {
    freightType() {
      const item = this.list_freight.find(i => i.id === this.form.shop_freight_id)
      return item.type
    },
  },
  created() {
    this.init()
    this.queryShopFreights()
  },
  methods: {
    ...methods,
    chooseImg(index) {
      this.$chooseImage({
        success: url => {
          this.list_img.splice(index, 1, url)
        }
      })
    },
    delImg(index) {
      this.list_img.splice(index, 1, '')
    },
    queryShopFreights() {
      ajax.get('/admin/shop/freights/query')
        .then(res => {
          this.list_freight.splice(1, 0, ...res)
        })
    },
    getInfoThen(res) {
      const imgs = res.info.imgs
      this.list_img.splice(0, imgs.length, ...imgs)
      this.list_sku = res.skus
      this.assignForm(res.info)
    },
    formatForm(data) {
      data.imgs = this.list_img.filter(Boolean)
      data.skus = this.list_sku
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
}
.tabs {
  margin-bottom: 22px;
}

/* 商品图片
------------------------ */
.goods-imgs {
  margin: 10px 0 0 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border: 1px dashed #c0ccda;
    border-radius: 5px;
    cursor: pointer;
    vertical-align: top;

    i {
      font-size: 28px;
      color: #8c939d;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-icon-delete-solid {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 20px;
    color: orangered;
  }
}
</style>