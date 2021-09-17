<template>
  <section class="main-card">
    <el-alert title="请谨慎填写，以免造成不必要的经济损失！" effect="dark" type="warning" center show-icon />
    <el-form ref="form" label-width="6em" :model="form" :rules="form_rule">
      <el-tabs model-value="system">
        <el-tab-pane label="系统" name="system">
          <el-form-item label="系统状态">
            <el-radio v-model="form.system_state" :label="1">运行中</el-radio>
            <el-radio v-model="form.system_state" :label="0">维护中</el-radio>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="提现" name="withdraw">
          <el-form-item label="提现功能">
            <el-radio v-model="form.withdraw" :label="1">开启</el-radio>
            <el-radio v-model="form.withdraw" :label="0">关闭</el-radio>
          </el-form-item>
          <el-form-item label="是否审核">
            <el-radio v-model="form.withdraw_check" :label="1">开启</el-radio>
            <el-radio v-model="form.withdraw_check" :label="0">关闭</el-radio>
          </el-form-item>
          <el-form-item label="最低金额" prop="withdraw_min">
            <el-input v-model="form.withdraw_min" class="width-short" placeholder="空则不限制">
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最高金额" prop="withdraw_max">
            <el-input v-model="form.withdraw_max" class="width-short" placeholder="空则不限制">
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="手续费" prop="withdraw_tax">
            <el-input v-model="form.withdraw_tax" class="width-short" placeholder="空则无手续费">
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="积分" name="point">
          <el-form-item label="签到奖励" prop="point_sign">
            <el-input v-model="form.point_sign" placeholder="空则不奖励" />
          </el-form-item>
          <el-form-item label="邀请奖励" prop="point_invite">
            <el-input v-model="form.point_invite" placeholder="空则不奖励" />
          </el-form-item>
          <el-form-item label="积分充值" prop="point_recharge">
            <el-input v-model="form.point_recharge" placeholder="空则不支持充值">
              <template #prepend>1积分</template>
              <template #append>元</template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-footer>
      <el-button type="primary" @click="submit">保 存</el-button>
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
        point_recharge: '',
        withdraw: 1,
        withdraw_check: 1,
        withdraw_max: '',
        withdraw_min: '',
        withdraw_tax: '',
      },
      form_rule: {
        point_recharge: [
          { pattern: /^\d+(\.\d+)?$/, message: '不合法', trigger: 'blur' },
        ],
        point_invite: [
          { pattern: /^\d*$/, message: '不合法，整数', trigger: 'blur' },
        ],
        point_sign: [
          { pattern: /^\d*$/, message: '不合法，整数', trigger: 'blur' },
        ],
        withdraw_max: [
          { pattern: /^\d+(\.\d{1,2})?$/, message: '不合法，2位小数', trigger: 'blur' },
        ],
        withdraw_min: [
          { pattern: /^\d+(\.\d{1,2})?$/, message: '不合法，2位小数', trigger: 'blur' },
        ],
        withdraw_tax: [
          { pattern: /^\d{1,2}(\.\d{1,2})?$/, message: '不合法，2位小数', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.request()
  },
  methods: {
    request() {
      ajax.get('/admin/setting/config')
        .then(res => {
          Object.assign(this.form, res)
        })
        .catch(() => 1)
    },
    submit() {
      ajax.put('/admin/setting/config', this.form)
        .then(() => {
          this.$message.success('保存成功')
        })
        .catch(() => 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-bottom: 20px;
}
</style>
