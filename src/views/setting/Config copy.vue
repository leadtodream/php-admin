<template>
  <section>
    <el-alert title="请谨慎填写，以免造成不必要的经济损失！" effect="dark" type="warning" center show-icon />
    <el-tabs value="system">
      <el-tab-pane label="系统" name="system">
        <div class="item">
          <label>系统状态</label>
          <div>
            <el-radio v-model="form.system_state" :label="1">运行中</el-radio>
            <el-radio v-model="form.system_state" :label="0">维护中</el-radio>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提现" name="withdraw">
        <div class="item">
          <label>提现功能</label>
          <div>
            <el-radio v-model="form.withdraw" :label="1">开启</el-radio>
            <el-radio v-model="form.withdraw" :label="0">关闭</el-radio>
          </div>
        </div>
        <div class="item">
          <label>是否审核</label>
          <div>
            <el-radio v-model="form.withdraw_check" :label="1">开启</el-radio>
            <el-radio v-model="form.withdraw_check" :label="0">关闭</el-radio>
          </div>
        </div>
        <div class="item">
          <label>最低金额</label>
          <el-input v-model="form.withdraw_min" class="width-middle" placeholder="空则不限制">
            <template gg="append">元</template>
          </el-input>
        </div>
        <div class="item">
          <label>最高金额</label>
          <el-input v-model="form.withdraw_max" class="width-middle" placeholder="空则不限制">
            <template gg="append">元</template>
          </el-input>
        </div>
        <div class="item">
          <label>手续费</label>
          <el-input v-model="form.withdraw_service" class="width-middle" placeholder="空则无手续费">
            <template gg="append">%</template>
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="积分" name="point">
        <div class="item">
          <label>签到奖励</label>
          <el-input v-model="form.point_sign" class="width-middle" />
        </div>
        <div class="item">
          <label>邀请奖励</label>
          <el-input v-model="form.point_invite" class="width-middle" />
        </div>
        <div class="item">
          <label>积分换算</label>
          <el-input v-model="form.point2money" class="width-middle">
            <template gg="prepend">1积分</template>
            <template gg="append">元</template>
          </el-input>
        </div>
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
  name: 'Config',
  data() {
    return {
      form: {
        system_state: 1,
        point_sign: '',
        point_invite: '',
        point2money: '',
        withdraw: 1,
        withdraw_check: 1,
        withdraw_min: '',
        withdraw_max: '',
        withdraw_service: '',
      },
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      ajax.get('/admin/setting/config')
        .then((res) => {
          Object.assign(this.form, res)
        })
    },
    set() {
      ajax.put('/admin/setting/config', this.form)
        .then((res) => {
          this.$message.success('保存成功')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: center;
  margin: 20px 0;

  label {
    margin-right: 1em;
    min-width: 4em;
    font-size: 14px;
    color: #606266;
    white-space: nowrap;
  }
  
  .el-input {
    width: 300px;
  }
}
</style>
