<template>
  <section>
    <form>
      <legend>{{ title }}</legend>
      <div class="fieldset-container" :class="{translate:type===1}">
        <fieldset>
          <el-input v-model="form.username" placeholder="账号" />
          <el-input v-model="form.password" placeholder="密码" show-password />
        </fieldset>
        <fieldset>
          <el-input placeholder="请填写邮箱地址" v-model="form.email">
            <template #prepend>邮箱</template>
          </el-input>
          <div class="el-input el-input-group el-input-group--append">
            <input v-model="form.code" autocomplete="off" placeholder="请填写验证码" class="el-input__inner" maxlength="6">
            <div class="el-input-group__append pointer" @click="sendCode">{{ text }}</div>
          </div>
        </fieldset>
      </div>
      <el-button class="submit" :loading="is_loading" type="primary" @click="submit">登 录</el-button>
      <div class="tip" @click="toggleType">{{type?'密码登录！':'忘记密码？'}}</div>
    </form>
    <p>Powered by Green © 成都优享佳</p>
  </section>
</template>

<script>
import ajax from '@/assets/ajax'
import { title } from '@/settings'
import { setAuth } from '@/assets/auth'

export default {
  name: 'Login',
  data() {
    return {
      title,
      text: '发送验证码',
      type: 0,
      form: {
        code: '',
        email: '',
        password: '123456',
        username: 'admin',
      },
      is_cooldown: false,
      is_loading: false,
      is_waiting: false,
    }
  },
  methods: {
    countDown(time) {
      if (time === 0) {
        this.is_cooldown = false
        this.text = '发送验证码'
      } else {
        time -= 1
        this.text = `${time}s 后重新发送`
        setTimeout(() => this.countDown(time), 1000)
      }
    },
    sendCode() {
      const email = this.form.email
      if (!email) {
        return this.$message.error('请填写邮箱')
      }
      
      if (this.is_waiting) return
      if (this.is_cooldown) return
      this.is_waiting = true

      ajax.post(`/api/email-code`, { email })
        .then(() => {
          this.$message.success('邮件发送成功,请注意查收')
          this.is_cooldown = true
          this.countDown(60)
        })
        .catch(() => 1)
        .finally(() => this.is_waiting = false)  
    },
    submit() {
      if (this.is_loading) return
      this.is_loading = true

      let url = '/sign-in/admin'
      if (this.type) {
        url = '/sign-in/admin-email'
      }

      ajax.post(url, this.form)
        .then(res => {
          setAuth(res.Authorization)
          const url = this.$route.query.redirect || '/dashboard'
          this.$router.push(url)
          if (this.form.password === '123456') {
            this.$notify({
              title: '安全风险',
              message: '请修改初始密码',
              type: 'warning',
            })
          }
        })
        .catch(() => 1)
        .finally(() => this.is_loading = false)
    },
    toggleType() {
      this.type = this.type ? 0 : 1
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  height: 100vh;
  background-color: #2d3a4b;
  overflow: hidden;
}
section > p {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}

form {
  margin: auto;
  max-width: 450px;
  overflow: hidden;
}

legend {
  margin: 150px 0 75px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #eee;
}

.fieldset-container {
  width: 200%;
  transform: translateX(0);
  transition: transform 1s cubic-bezier(0,0,.2,1);
}
.fieldset-container.translate {
  transform: translateX(-50%);
}

fieldset {
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 50%;
  border: none;
  vertical-align: top;
}

.el-input {
  margin-bottom: 50px;
}

.submit {
  width: 100%;
  margin-top: 25px;
}

.tip {
  float: right;
  margin-top: 1em;
  color: gray;
  cursor: pointer;
}
</style>
