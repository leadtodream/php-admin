import ajax from '@/assets/ajax'

/**
 * 表单页通用方法
 */
const methods = {
  // 赋值表单
  assignForm(info) {
    for (const i in this.form) {
      if (Object.hasOwn(info, i)) {
        this.form[i] = info[i]
      }
    }
  },
  // 关闭页面
  close() {
    this.$store.dispatch('tagsView/delView', this.$route)
    this.$router.go(-1)
  },
  // 初始化
  init() {
    const { id } = this.$route.params
    if (id) {
      this.id = Number(id)
      this.getInfo()
    }
  },
  // 查询信息
  getInfo() {
    ajax.get(`${this.api}/${this.id}/edit`)
      .then(res => {
        // 是否自行处理
        if (this.getInfoThen) {
          return this.getInfoThen(res)
        }

        this.assignForm(res.info)
      })
      .catch(() => 1)
  },
  // 保存信息
  saveInfo() {
    if (this.is_waiting) return
    this.is_waiting = true

    // 构建参数
    let method = 'post'
    let url = this.api
    let data = { ...this.form }
    if (this.id) {
      method = 'put'
      url = `${url}/${this.id}`
    }

    // 格式化请求参数
    this.formatForm && this.formatForm(data)

    // 发送请求
    ajax({ method, url, data })
      .then(() => {
        this.$message.success('保存成功')
        this.close()
      })
      .catch(() => 1)
      .finally(() => this.is_waiting = false)
  },
}

export default methods
