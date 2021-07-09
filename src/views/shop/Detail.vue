<template>
  <section>
    <el-tabs value="tab1">
      <el-tab-pane label="基本信息" name="tab1">
        <el-row>
          <el-col :span="12">
            <dl class="info">
              <dt>商家名称</dt>
              <dd>{{ info.name }}</dd>
              <dt>联系人</dt>
              <dd>{{ info.contact }}</dd>
              <dt>联系电话</dt>
              <dd>{{ info.contact_phone }}</dd>
              <dt>地区</dt>
              <dd>{{ info.province }} {{ info.city }} {{ info.area }}</dd>
              <dt>地址</dt>
              <dd>{{ info.address }}</dd>
              <dt>营业执照</dt>
              <dd>
                <img :src="info.img_license">
              </dd>
            </dl>
          </el-col>
          <el-col :span="12">
            <dl class="info">
              <dt>余额</dt>
              <dd>
                <span>￥ {{ info.money }}</span>
                <el-button type="info" size="mini" plain @click="showDialogMoney">充 值</el-button>
              </dd>
              <dt>创建时间</dt>
              <dd>{{ info.created_at }}</dd>
              <dt>更新时间</dt>
              <dd>{{ info.updated_at }}</dd>
            </dl>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 弹窗 -->
    <DialogMoney ref="dialogMoney" @changed="getInfo" />
  </section>
</template>

<script>
import DialogMoney from './components/DialogMoney'
import ajax from '@/assets/ajax'

export default {
  name: 'ShopDetail',
  components: { DialogMoney },
  data() {
    return {
      id: 0,
      info: {},
    }
  },
  created() {
    const { id } = this.$route.params
    this.id = Number(id)
    this.getInfo()
  },
  methods: {
    getInfo() {
      ajax.get(`/admin/shops/${this.id}`)
        .then(res => {
          this.info = res.info
        })
    },
    showDialogMoney() {
      this.$refs.dialogMoney.showDialog(this.id)
    },
  },
}
</script>

<style scoped>
.el-button {
  margin-left: 1em;
}
</style>