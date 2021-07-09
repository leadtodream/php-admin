import Layout from '@/layout'

export default {
  path: '/log',
  name: 'Log',
  component: Layout,
  meta: { title: '日志记录', icon: 'log' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/logs/version',
      name: 'LogVersion',
      component: () => import('@/views/log/Version'),
      meta: { title: '版本号' },
    },
    {
      path: '/logs/in',
      name: 'LogIn',
      component: () => import('@/views/log/In'),
      meta: { title: '登录日志' },
    },
    {
      path: '/logs/operation',
      name: 'LogOperation',
      component: () => import('@/views/log/Operation'),
      meta: { title: '操作日志' },
    },
    {
      path: '/logs/schedule',
      name: 'LogSchedule',
      component: () => import('@/views/log/Schedule'),
      meta: { title: '任务调度' },
    },
    {
      path: '/logs/callback',
      name: 'LogCallback',
      component: () => import('@/views/log/Callback'),
      meta: { title: '第三方回调' },
    },
  ],
}
