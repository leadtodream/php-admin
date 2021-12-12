import ajax from './ajax'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Xlsx from 'xlsx'
import { ElMessage as Message } from 'element-plus'

// 赋值
function assignForm(form, data) {
  for (const i in form) {
    form[i] = data[i]
  }
}

// 审核
function confirmCheck() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: '是否通过审核?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: '通过',
      cancelButtonText: '驳回',
    }).then(res => {
      let state = res.isConfirmed ? 1 : 0
      if (res.dismiss === 'cancel') {
        state = -1
      }
      if (state) {
        resolve(state)
      }
    }).catch(() => reject())
  })
}

// 复制文本
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      Message.success('复制成功')
    }, err => {
      Message.error(err)
    })
}

/**
 * Json转Excel
 * 
 * @params params {
 *  filename: string 文件名称
 *  head: array 头部
 *  keys: array 键
 *  list: array 数据
 * }
 * @example {
 *  filename: '用户数据',
 *  head: ['昵称','姓名','性别','电话','创建时间'],
 *  keys: ['nickname','realname','gender','phone','created_at'],
 *  list: this.list,
 * }
 */ 
function json2xlsx(params) {
  // 构建数据
  const data = []
  data.push(Object.values(params.column))

  const values = params.list.map(i => {
    return Object.keys(params.column).map(j => i[j])
  })
  
  data.push(...values)

  // create a new blank workbook
  const wb = Xlsx.utils.book_new()

  // converts an array of arrays of JS data to a worksheet.
  const ws = Xlsx.utils.aoa_to_sheet(data)

  // add worksheet to workbook
  Xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')

  // write workbook
  Xlsx.writeFile(wb, `${params.filename}.xlsx`)
}

// 上传七牛云 
function uploadQiniu(file, onUploadProgress = null) {
  return new Promise((resolve, reject) => {
    // 获取上传凭证
    ajax.get('/api/qiniu-kodo')
      .then(res => {
        const form = new FormData()
        form.append('file', file)
        form.append('token', res.token)

        // 上传七牛云
        Axios.post(res.url, form, {onUploadProgress,headers:{'content-type':'application/x-www-form-urlencoded'}})
          .then(res2 => {
            resolve(`${res.host}/${res2.data.key}`)
          })
          .catch(() => 1)
      })
      .catch(() => reject())
  })
}

// Excel转Json
function xlsx2json(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      const workbook = Xlsx.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const results = Xlsx.utils.sheet_to_json(worksheet)
      resolve(results)
    }
    reader.onerror = () => reject()
    reader.readAsArrayBuffer(file)
  })
}

export {
  assignForm,
  confirmCheck,
  copyText,
  json2xlsx,
  uploadQiniu,
  xlsx2json,
}
