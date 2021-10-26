<template>
  <section>
    <form>
      <legend>{{ title }}</legend>
      <div class="fieldset-container" :class="{translate:type===1}">
        <fieldset>
          <el-input v-model="form.account" placeholder="账号" prefix-icon="el-icon-user" />
          <el-input v-model="form.password" placeholder="密码" prefix-icon="el-icon-lock" show-password @keyup.enter="submit" />
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
      <div class="footer">
        <label class="left">
          <input type="checkbox" v-model="is_remember">自动登录
        </label>
        <div class="right" @click="toggleType">{{type?'密码登录！':'忘记密码？'}}</div>
      </div>
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
      text: '获取验证码',
      type: 0,
      form: {
        account: 'admin',
        code: '',
        email: '',
        password: '123456',
      },
      is_cooldown: false,
      is_loading: false,
      is_remember: false,
      is_waiting: false,
    }
  },
  methods: {
    countDown(time) {
      if (time === 0) {
        this.is_cooldown = false
        this.text = '获取验证码'
      } else {
        time -= 1
        this.text = `${time}s 后重新发送`
        setTimeout(() => this.countDown(time), 1000)
      }
    },
    sendCode() {
      if (this.is_waiting) return
      if (this.is_cooldown) return
      this.is_waiting = true

      ajax.post(`/api/email-code`, { email: this.form.email })
        .then(() => {
          this.is_cooldown = true
          this.countDown(60)
          this.$notify({
            title: '发送成功',
            message: '请注意查收',
            type: 'success',
          })
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
          setAuth(res.Authorization, this.is_remember)
          const url = this.$route.query.redirect || '/dashboard'
          this.$router.push(url)

          if (0 && this.form.password === '123456') {
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
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
  color: gray;
  user-select: none;

  .left {
    cursor: pointer;
    font-weight: normal;
  }

  .right {
    cursor: pointer;
  }
}

</style>
