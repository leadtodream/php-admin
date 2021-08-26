import Layout from '@/layout'

export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  meta: { title: '系统设置', icon: 'setting' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/setting/roles',
      name: 'Role',
      component: () => import('@/views/setting/Role'),
      meta: { title: '角色' },
    },
    {
      path: '/setting/administrators',
      name: 'Admin',
      component: () => import('@/views/setting/Admin'),
      meta: { title: '管理员' },
    },
    {
      path: '/setting/config',
      name: 'Config',
      component: () => import('@/views/setting/Config'),
      meta: { title: '参数配置' },
    },
    {
      path: '/setting/thirdauth',
      name: 'Thirdauth',
      component: () => import('@/views/setting/Thirdauth'),
      meta: { title: '第三方授权' },
    },
  ],
}
