import { createRouter, createWebHashHistory } from 'vue-router'
import public_routes from './public'

const router = createRouter({
  history: createWebHashHistory(),
  routes: public_routes,
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
