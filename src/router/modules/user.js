import Layout from '@/layout'

export default {
  path: '/user',
  name: 'User',
  component: Layout,
  meta: { title: '用户', icon: 'user' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/users',
      name: 'UserList',
      component: () => import('@/views/user/List'),
      meta: { title: '用户列表' },
      children: [
        {
          path: '/users/:id(\\d+)',
          name: 'UserDetail',
          component: () => import('@/views/user/Detail'),
          meta: { title: '用户详情', activeMenu: '/users' },
          hidden: true,
        },
        {
          path: 'EditUser',
          name: 'EditUser',
          meta: { title: '编辑' },
          hidden: true,
        },
        {
          path: 'EditUserMoney',
          name: 'EditUserMoney',
          meta: { title: '充值余额' },
          hidden: true,
        },
        {
          path: 'EditUserPoint',
          name: 'EditUserPoint',
          meta: { title: '充值积分' },
          hidden: true,
        },
        {
          path: 'EditUserParent',
          name: 'EditUserParent',
          meta: { title: '修改推荐人' },
          hidden: true,
        },
      ],
    },
    {
      path: '/users/money',
      name: 'UserMoney',
      component: () => import('@/views/user/Money'),
      meta: { title: '余额明细' },
    },
    {
      path: '/users/points',
      name: 'UserPoint',
      component: () => import('@/views/user/Point'),
      meta: { title: '积分明细' },
    },
    {
      path: '/users/feedbacks',
      name: 'UserFeedback',
      component: () => import('@/views/user/Feedback'),
      meta: { title: '意见反馈' },
    },
    {
      path: '/users/reviews',
      name: 'UserReview',
      component: () => import('@/views/user/Review'),
      meta: { title: '评论留言' },
    },
    {
      path: '/groups',
      name: 'GroupList',
      component: () => import('@/views/group/List'),
      meta: { title: '分组管理' },
    },
  ],
}
