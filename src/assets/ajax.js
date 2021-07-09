import Axios from 'axios'
import Swal from 'sweetalert2'
import { ElMessage as Message } from 'element-plus'
import { getAuth } from '@/assets/auth'
import store from '@/store'
import router from '@/router/index.js'

// 创建实例
const instance = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: { Authorization: '' },
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const auth = getAuth()
  if (auth) {
    config.headers.Authorization = auth
  }

  // 删除请求
  if (config.method === 'delete') {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: '确定要删除吗?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#ccc',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(res => {
        if (res.isConfirmed) {
          resolve()
        } else {
          reject()
        }
      })
    }).then(() => {
      return config
    }).catch(() => {
      console.log('删除请求确认 error')
      return Promise.reject()
    })
  }

  return config
}, error => {
  console.log('请求拦截器 error')
  Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  const res = response.data
  if (res.code === 0) {
    return res.data
  }

  // 是否自身处理异常
  if (response.config.selfCatch) {
    return Promise.reject(res)
  }

  // 判断状态码
  checkCode(res.code, res.msg)
  return Promise.reject()
}, error => {
  Message({
    message: '请求超时，请重试。',
  })
  return Promise.reject(error)
})

// 检测状态码
function checkCode(code, message) {
  switch (code) {
    case 401:
      store.dispatch('user/signOut')
      router.push('/login')
      break
    case 406:
      Message({
        message,
        type: 'error',
      })
      break
    case 412:
      Swal.fire('操作失败', message, 'warning')
      break
    case 500:
      Swal.fire('系统故障', '服务器内部错误，请联系开发者', 'error')
      break
    default:
      Message({
        message,
        type: 'error',
      })
      break
  }
}

// 上传图片
function uploadImage(file, module = '') {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('file', file)
    form.append('module', module)
    instance.post('/upload/image', form)
      .then(res => {
        resolve(res.url)
      })
      .catch(() => reject())
  })
}

export default instance
export {
  uploadImage,
}
