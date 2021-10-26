<template>
  <section class="main-form">
    <el-tabs model-value="tab1">
      <el-tab-pane label="账号信息" name="tab1">
        <Account />
      </el-tab-pane>
      <el-tab-pane label="登录日志" name="tab2" :lazy="true">
        <LogIn />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import Account from './components/Account'
import LogIn from './components/LogIn'

export default {
  name: 'Profile',
  components: { Account, LogIn },
}
</script>
