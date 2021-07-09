import router from './router'
import store from './store'
import { ElMessage as Message } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getAuth, removeAuth } from '@/assets/auth'
import { title } from '@/settings'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = to.meta.title ? `${to.meta.title} | ${title}` : title

  // determine whether the user has logged in
  const auth = getAuth()

  if (auth) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      if (store.getters.myRoutes.length) {
        next()
      } else {
        // 查询用户权限
        const privileges = await store.dispatch('user/getInfo')
        if (!privileges.length) {
          Message.error('一点权限都没有 (⋟﹏⋞)')
          removeAuth()
          next('/login')
          NProgress.done()
          return false
        }

        // 分配路由
        const routes = await store.dispatch('privilege/generateRoutes', privileges)

        // dynamically add accessible routes
        routes.forEach(i => router.addRoute(i))

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
