import ajax from '@/assets/ajax'

// 类别
function queryCategory(module) {
  ajax.get(`/categories/${module}`)
    .then(res => {
      this.list_category = res
    })
}

// 分组
function queryGroup() {
  ajax.get('/admin/groups/query')
    .then(res => {
      this.list_group = res
    })
}

// 角色
function queryRole() {
  ajax.get('/admin/roles/query')
    .then(res => {
      this.list_role = res
    })
}

// 店铺
function queryShop(keyword = '') {
  ajax.get('/admin/shops/query', { params: { keyword }})
    .then(res => {
      this.list_shop = res
    })
}

// 用户
function queryUser(keyword) {
  ajax.get('/admin/users/query', { params: { keyword }})
    .then(res => {
      this.list_user = res
    })
}

export {
  queryCategory,
  queryGroup,
  queryRole,
  queryShop,
  queryUser,
}
