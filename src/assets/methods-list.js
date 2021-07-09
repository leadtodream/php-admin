import Ajax from '@/assets/ajax'
import { json2xlsx } from '@/assets/methods'

/**
 * 列表页通用方法
 */
const methods = {
  // 删除
  delRow(id) {
    Ajax.delete(`${this.api}/${id}`)
      .then(() => {
        this.$message.success('删除成功')
        this.getList()
      })
  },
  // 删除多个
  delRows() {
    if (!this.list_checked.length) {
      return this.$message.error('请选择操作项')
    }

    const id = this.list_checked.join(',')
    this.delRow(id)
  },
  // 查询-列表
  getList() {
    if (this.is_loading) return
    this.is_loading = true

    Ajax.get(this.api, { params: this.list_query })
      .then(res => {
        // 是否自行处理
        if (this.getListThen) {
          return this.getListThen(res)
        }

        // 格式化数据
        this.formatList && this.formatList(res.list) 
        
        this.list = res.list
        this.total = res.total
      })
      .catch(() => 1)
      .finally(() => this.is_loading = false)
  },
  // 导出Excel表格
  list2xlsx(params) {
    Ajax.get(`${this.api}/export`, { params: this.list_query })
      .then(res => {
        params.list = res
        json2xlsx(params)
      })
      .finally(() => this.is_export = false)
  },
  // 筛选
  listFilter(e) {
    for (const i in e) {
      if (e[i].length === 1) {
        e[i] = e[i][0]
      }
    }
    Object.assign(this.list_query, e)
    this.listSearch()
  },
  // 初始化
  listInit() {
    this.list_checked = []
    this.list_query_copy = { ...this.list_query }
    if (this.form) {
      this.form_copy = { ...this.form}
    }
    this.getList()
  },
  // 重置
  listReset() {
    this.list_query = { ...this.list_query_copy }
    this.$refs.table?.clearFilter()
    this.$refs.table?.clearSort()
    this.getList()
  },
  // 搜索
  listSearch() {
    this.list_query.page = 1
    this.getList()
  },
  // 多选
  listSelect(e) {
    const ids = []
    e.forEach(item => ids.push(item.id))
    this.list_checked = ids
  },
  // 排序
  listSort(e) {
    let sort = ''
    if (e.order) {
      sort = e.order === 'descending' ? `${e.prop}:desc` : e.prop
      if (sort !== this.list_query.sort) {
        this.list_query.sort = sort
        this.listSearch()
      }
    }
  },
  // 添加
  toAdd() {
    const { path } = this.$route
    this.$router.push(`${path}/add`)
  },
  // 详情
  toDetail(id) {
    const { path } = this.$route
    console.log(path)
    this.$router.push(`${path}/${id}`)
  },
  // 编辑
  toEdit(id) {
    const { path } = this.$route
    this.$router.push(`${path}/${id}/edit`)
  },
}

export default methods
