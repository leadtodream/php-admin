/**
 * 公共路由
 */
import Layout from '@/layout'

export default [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'dashboard', affix: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '仪表盘', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404'),
    // redirect: '/404',
    hidden: true,
  },
]
