<template>
  <section class="main-card">
    <el-tabs model-value="weixin_mini">
      <el-tab-pane label="微信小程序" name="weixin_mini">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_mini.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_mini.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信公众号" name="weixin_offi">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_offi.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_offi.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信APP" name="weixin_app">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_app.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_app.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信H5" name="weixin_h5">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_h5.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_h5.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信商户号" name="weixin_mch">
        <div class="item">
          <label>商户号</label>
          <el-input v-model="form.weixin_mch.mch_id" />
        </div>
        <div class="item">
          <label>API密钥</label>
          <el-input v-model="form.weixin_mch.mch_key" />
        </div>
        <div class="item">
          <label>APIv3密钥</label>
          <el-input v-model="form.weixin_mch.mch_key_v3" />
        </div>
        <div class="item">
          <label>证书cert</label>
          <el-tag v-if="form.weixin_mch.sslcert" type="success">已上传</el-tag>
          <input type="file" @change="uploadFile('cert', $event)">
        </div>
        <div class="item">
          <label>证书key</label>
          <el-tag v-if="form.weixin_mch.sslkey" type="success">已上传</el-tag>
          <input type="file" @change="uploadFile('key', $event)">
        </div>
      </el-tab-pane>
      <el-tab-pane label="支付宝APP" name="alipay_app">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.alipay_app.app_id" />
        </div>
        <div class="item">
          <label>应用私钥</label>
          <el-input v-model="form.alipay_app.app_key" type="textarea" />
        </div>
        <div class="item">
          <label>支付宝公钥</label>
          <el-input v-model="form.alipay_app.public_key" type="textarea" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="腾讯云API" name="tencent">
        <div class="item">
          <label>SecretId</label>
          <el-input v-model="form.tencent.id" />
        </div>
        <div class="item">
          <label>SecretKey</label>
          <el-input v-model="form.tencent.key" />
        </div>
        <a class="el-link el-link--info" href="https://console.cloud.tencent.com/cam/capi" target="_blank">如何获取？</a>
      </el-tab-pane>
      <el-tab-pane label="腾讯云短信" name="tencent_sms">
        <div class="item">
          <label>SDK AppID</label>
          <el-input v-model="form.tencent_sms.id" />
        </div>
        <div class="item">
          <label>App Key</label>
          <el-input v-model="form.tencent_sms.key" />
        </div>
        <a class="el-link el-link--info" href="https://console.cloud.tencent.com/smsv2/app-manage" target="_blank">如何获取？</a>
      </el-tab-pane>
      <el-tab-pane label="腾讯位置服务" name="tencent_map">
        <div class="item">
          <label>应用 Key</label>
          <el-input v-model="form.tencent_map.key" />
        </div>
        <a class="el-link el-link--info" href="https://lbs.qq.com/dev/console/application/mine" target="_blank">如何获取？</a>
      </el-tab-pane>
      <el-tab-pane label="阿里云API" name="aliyun">
        <div class="item">
          <label>AccessKey ID</label>
          <el-input v-model="form.aliyun.id" />
        </div>
        <div class="item">
          <label>AccessKey Secret</label>
          <el-input v-model="form.aliyun.secret" />
        </div>
        <a class="el-link el-link--info" href="https://usercenter.console.aliyun.com" target="_blank">如何获取？</a>
      </el-tab-pane>
      <el-tab-pane label="七牛云API" name="qiniu">
        <div class="item">
          <label>AK</label>
          <el-input v-model="form.qiniu.access_key" />
        </div>
        <div class="item">
          <label>SK</label>
          <el-input v-model="form.qiniu.secret_key" />
        </div>
        <a class="el-link el-link--info" href="https://portal.qiniu.com/user/key" target="_blank">如何获取？</a>
      </el-tab-pane>
    </el-tabs>
    <el-footer>
      <el-button type="primary" @click="set">保 存</el-button>
    </el-footer>
  </section>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'Thirdauth',
  data() {
    return {
      form: {
        alipay_app: {app_id:'',app_key:'',public_key:''},
        aliyun: {id:'',secret:''},
        qiniu: {access_key:'',bucket:'',bucket_host:'',secret_key:''},
        tencent: {id:'',key:''},
        tencent_map: {key:''},
        tencent_sms: {id:'',key:''},
        weixin_app: {app_id:'',app_secret:''},
        weixin_h5: {app_id:'',app_secret:''},
        weixin_mch: {mch_id:'',mch_key:'',mch_key_v3:'',sslcert:'',sslkey:''},
        weixin_mini: {app_id:'',app_secret:''},
        weixin_offi: {app_id:'',app_secret:''},
      },
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      ajax.get('/admin/setting/thirdauth')
        .then(res => {
          Object.assign(this.form, res)
        })
    },
    set() {
      ajax.put('/admin/setting/thirdauth', this.form)
        .then(() => {
          delete this.form.weixin_mch_sslcert
          delete this.form.weixin_mch_sslkey
          this.get()
          this.$message.success('保存成功')
        })
    },
    // 上传微信证书
    uploadFile(file, e) {
      const data = new FormData()
      data.append('file', e.target.files[0])
      ajax.post('/upload', data)
        .then(res => {
          const filename = res.filename
          if (file === 'cert') {
            this.form.weixin_mch_sslcert = filename
          } else {
            this.form.weixin_mch_sslkey = filename
          }
        })
    },
  },
}
</script>

<style scoped>
.el-tabs {
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.item > label {
  margin-right: 1em;
  min-width: 5em;
  color: #606266;
}

::v-deep(.el-tag) {margin-right: 1em;}
::v-deep(.el-input),
::v-deep(.el-textarea) {flex: 1;}
</style>
